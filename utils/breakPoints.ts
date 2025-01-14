import { useBreakpointValue } from '~/components/ui/utils/use-break-point-value';

export const useCommonBreakPoints = () => ({
  marginAuto: useBreakpointValue({ default: '', sm: 'auto', md: 'auto' }),
  minWidth: useBreakpointValue({ default: 300, sm: 600, md: 600 }),
  profileImageSize: useBreakpointValue({ default: 80, sm: 120, md: 120 }),
  imageSize: useBreakpointValue({ default: "lg", sm: "xl", md: "xl" }),
  iconSize: useBreakpointValue({ default: 24, sm: 34, md: 34 }),
  iconProductSize: useBreakpointValue({ default: 20, sm: 24, md: 24 }),
  noColumns: useBreakpointValue({ default: 2, sm: 3, md: 3 }),
});
