import Svg, { G, Path, type SvgProps } from 'react-native-svg';

export default function DropdownIcon(props: SvgProps) {
  return (
    <Svg width="40%" height="100%" viewBox="0 0 24 24" {...props}>
      <G>
        <Path d="M7 10l5 5 5-5" />
      </G>
    </Svg>
  );
}
