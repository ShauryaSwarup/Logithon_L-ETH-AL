"use client";
import { useState } from "react";
import { SegmentedControl, Text } from "@mantine/core";
import {
	IconShoppingCart,
	IconLicense,
	IconMessage2,
	IconBellRinging,
	IconMessages,
	IconFingerprint,
	IconKey,
	IconSettings,
	Icon2fa,
	IconUsers,
	IconFileAnalytics,
	IconDatabaseImport,
	IconReceipt2,
	IconReceiptRefund,
	IconLogout,
	IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "./NavbarSegmented.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = {
	account: [
		{ link: "/verify", label: "Verify Yourself", icon: IconBellRinging },
		{ link: "/dashboard", label: "Dashboard", icon: IconReceipt2 },
		{ link: "/shipment", label: "Shipment", icon: IconFingerprint },
		{ link: "/createorder", label: "Create Order", icon: IconKey },
		{ link: "/chat", label: "Customer Service", icon: IconDatabaseImport },
		{ link: "/profile", label: "Profile", icon: Icon2fa },
		// { link: "", label: "Other Settings", icon: IconSettings },
	],
	general: [
		{ link: "", label: "Orders", icon: IconShoppingCart },
		{ link: "", label: "Receipts", icon: IconLicense },
		{ link: "", label: "Reviews", icon: IconMessage2 },
		{ link: "", label: "Messages", icon: IconMessages },
		{ link: "", label: "Customers", icon: IconUsers },
		{ link: "", label: "Refunds", icon: IconReceiptRefund },
		{ link: "", label: "Files", icon: IconFileAnalytics },
	],
};
export function NavbarSegmented() {
	const [section, setSection] = useState("account");
	const [active, setActive] = useState("Billing");
    const pathname = usePathname();
	const links = tabs[section].map((item) => (
		<Link
			href={item.link}
			className={classes.link}
			data-active={item.link === pathname || undefined}
			key={item.label}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Link>
	));
	return (
		<nav className={classes.navbar}>
			<div>
				<Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
					bgluesticker@mantine.dev
				</Text>

				<SegmentedControl
					value={section}
					onChange={(value) => setSection(value)}
					transitionTimingFunction="ease"
					fullWidth
					data={[
						{ label: "Account", value: "account" },
						{ label: "System", value: "general" },
					]}
				/>
			</div>

			<div className={classes.navbarMain}>{links}</div>

			<div className={classes.footer}>
				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					{/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
					{/* <span>Change account</span> */}
					<ConnectButton showBalance={false} />
				</a>

				{/* <a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</a> */}
			</div>
		</nav>
	);
}
