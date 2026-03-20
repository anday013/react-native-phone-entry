import { createRunOncePlugin, withDangerousMod } from '@expo/config-plugins';
import type { ConfigPlugin } from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

// Swift file copied verbatim; ObjC file is treated as a template.
const IOS_SWIFT_FILES = ['PhonePadInputView.swift'];
const IOS_OBJC_TEMPLATE = 'RNPhonePadKeyboard.m';

// Path to our bundled iOS sources relative to the built plugin (plugin/build/index.js).
const IOS_SOURCE_DIR = path.join(__dirname, '..', 'ios');

/**
 * Expo config plugin — adds the iPhone-style phone-pad keyboard for iPads.
 *
 * Usage in app.json / app.config.js:
 *   { "plugins": ["react-native-phone-entry"] }
 *
 * Then call `configureIPadPhonePad()` once at app startup (e.g. in App.tsx).
 */
const withIPadPhonePad: ConfigPlugin = (config) => {
  config = withDangerousMod(config, [
    'ios',
    (modConfig) => {
      const projectName = modConfig.modRequest.projectName!;
      const platformRoot = modConfig.modRequest.platformProjectRoot;

      // withDangerousMod runs AFTER Expo has generated the native project,
      // so the ios/<AppName>/ directory is guaranteed to exist here.
      const destDir = path.join(platformRoot, projectName);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // 1a. Copy Swift files verbatim.
      for (const file of IOS_SWIFT_FILES) {
        const src = path.join(IOS_SOURCE_DIR, file);
        if (!fs.existsSync(src)) {
          throw new Error(
            `react-native-phone-entry plugin: missing iOS source file: ${src}`
          );
        }
        fs.copyFileSync(src, path.join(destDir, file));
      }

      // 1b. Copy the ObjC module file, substituting __RN_PROJECT_NAME__ so the
      //     file can import the Xcode-generated "<ProjectName>-Swift.h" header
      //     which exposes PhonePadInputView to Objective-C.
      const objcTemplateSrc = path.join(IOS_SOURCE_DIR, IOS_OBJC_TEMPLATE);
      if (!fs.existsSync(objcTemplateSrc)) {
        throw new Error(
          `react-native-phone-entry plugin: missing iOS source file: ${objcTemplateSrc}`
        );
      }
      const objcContent = fs
        .readFileSync(objcTemplateSrc, 'utf8')
        .replace(/__RN_PROJECT_NAME__/g, projectName);
      fs.writeFileSync(path.join(destDir, IOS_OBJC_TEMPLATE), objcContent);

      // 2. Register the files in project.pbxproj so Xcode compiles them.
      //    Done here (not withXcodeProject) to operate on the already-written
      //    pbxproj, avoiding xcodeproj base-mod timing issues.
      const xcodeprojs = fs
        .readdirSync(platformRoot)
        .filter((name) => name.endsWith('.xcodeproj'));

      if (!xcodeprojs.length) return modConfig;

      const pbxprojPath = path.join(
        platformRoot,
        xcodeprojs[0]!,
        'project.pbxproj'
      );
      if (!fs.existsSync(pbxprojPath)) return modConfig;

      // xcode is a peer dep of @expo/config-plugins and is always present.

      const xcode = require('xcode') as typeof import('xcode');
      const project = xcode.project(pbxprojPath);
      project.parseSync();

      const firstTarget = project.getFirstTarget();
      if (!firstTarget) return modConfig;

      // Passing the group key to addSourceFile makes xcode use the addFile()
      // code path instead of addPluginFile(), which crashes on projects that
      // have no "Plugins" PBX group (null.path error).
      const groupKey =
        project.findPBXGroupKey({ name: projectName }) ??
        project.findPBXGroupKey({ path: projectName });

      const allFiles = [...IOS_SWIFT_FILES, IOS_OBJC_TEMPLATE];
      let changed = false;
      for (const file of allFiles) {
        const filePath = `${projectName}/${file}`;
        if (!project.hasFile(filePath)) {
          project.addSourceFile(
            filePath,
            { target: firstTarget.uuid },
            groupKey
          );
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(pbxprojPath, project.writeSync());
      }

      return modConfig;
    },
  ]);

  return config;
};

const pkg = require('../../package.json');

export default createRunOncePlugin(withIPadPhonePad, pkg.name, pkg.version);
