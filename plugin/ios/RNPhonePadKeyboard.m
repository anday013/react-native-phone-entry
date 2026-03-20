// NOTE: __RN_PROJECT_NAME__ is substituted by the react-native-phone-entry
// Expo config plugin at prebuild time (e.g. "MyApp-Swift.h"), giving this
// Objective-C file access to PhonePadInputView (a Swift class).
#import <UIKit/UIKit.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>
#import "__RN_PROJECT_NAME__-Swift.h"

@interface RNPhonePadKeyboard : RCTEventEmitter <RCTBridgeModule>
@end

@implementation RNPhonePadKeyboard {
  id _observer;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onCountryPickerRequested"];
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (void)dealloc {
  if (_observer) {
    [[NSNotificationCenter defaultCenter] removeObserver:_observer];
  }
}

RCT_EXPORT_METHOD(configure) {
  if (_observer != nil) return;

  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    __strong typeof(self) strongSelf = weakSelf;
    if (!strongSelf) return;
    strongSelf->_observer = [[NSNotificationCenter defaultCenter]
      addObserverForName:UITextFieldTextDidBeginEditingNotification
      object:nil
      queue:[NSOperationQueue mainQueue]
      usingBlock:^(NSNotification *notification) {
        [weakSelf handleTextFieldFocus:notification];
      }];
  });
}

- (void)handleTextFieldFocus:(NSNotification *)notification {
  if ([UIDevice currentDevice].userInterfaceIdiom != UIUserInterfaceIdiomPad) return;

  UITextField *field = notification.object;
  if (![field isKindOfClass:[UITextField class]]) return;
  if (field.keyboardType != UIKeyboardTypePhonePad) return;
  if ([field.inputView isKindOfClass:[PhonePadInputView class]]) return;

  __weak typeof(self) weakSelf = self;
  PhonePadInputView *pad = [[PhonePadInputView alloc] initWithTextField:field];
  pad.onCountryPickerRequest = ^{
    [weakSelf sendEventWithName:@"onCountryPickerRequested" body:@{}];
  };
  field.inputView = pad;
  [field reloadInputViews];
}

@end
