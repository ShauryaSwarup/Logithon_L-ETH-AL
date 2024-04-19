"use client";
import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavbarSegmented } from "./Navbar/Navbar";
// import styles from "./AppShell.module.css"; // Import the CSS module

export function AppShellProvider({ children }) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header className="">
				{" "}
				<Group h="100%" px="md" className="bg-blue-custom">
					<Text
						size="xl"
						fw={900}
						variant="gradient"
						gradient={{ from: "#FEF9EF", to: "#FEF9EF", deg: 121 }}
					>
						0xSupply
					</Text>
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar>
				<NavbarSegmented />
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
