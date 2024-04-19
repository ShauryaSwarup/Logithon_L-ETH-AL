import { useMantineTheme } from "@mantine/core";

export function useCustomTheme() {
	const theme = useMantineTheme();
	return {
		colors: theme.colors,
	};
}
