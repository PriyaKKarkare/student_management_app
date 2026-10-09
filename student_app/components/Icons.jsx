function Icon({ size = 18, children }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{children}
		</svg>
	);
}

export const CapIcon = (p) => (
	<Icon {...p}>
		<path d="M22 10 12 5 2 10l10 5 10-5Z" />
		<path d="M6 12v5c3 2 9 2 12 0v-5" />
	</Icon>
);

export const UsersIcon = (p) => (
	<Icon {...p}>
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</Icon>
);

export const ChartIcon = (p) => (
	<Icon {...p}>
		<path d="M3 3v18h18" />
		<path d="M8 17v-6" />
		<path d="M13 17V7" />
		<path d="M18 17v-3" />
	</Icon>
);

export const SettingsIcon = (p) => (
	<Icon {...p}>
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</Icon>
);

export const ChevronLeftIcon = (p) => (
	<Icon {...p}>
		<path d="m15 18-6-6 6-6" />
	</Icon>
);

export const ChevronRightIcon = (p) => (
	<Icon {...p}>
		<path d="m9 18 6-6-6-6" />
	</Icon>
);

export const UserIcon = (p) => (
	<Icon {...p}>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</Icon>
);

export const SearchIcon = (p) => (
	<Icon {...p}>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</Icon>
);

export const EyeIcon = (p) => (
	<Icon {...p}>
		<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
		<circle cx="12" cy="12" r="3" />
	</Icon>
);

export const FilterIcon = (p) => (
	<Icon {...p}>
		<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
	</Icon>
);

export const DownloadIcon = (p) => (
	<Icon {...p}>
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<path d="m7 10 5 5 5-5" />
		<path d="M12 15V3" />
	</Icon>
);

export const PlusIcon = (p) => (
	<Icon {...p}>
		<path d="M5 12h14" />
		<path d="M12 5v14" />
	</Icon>
);

export const LogOutIcon = (p) => (
	<Icon {...p}>
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<path d="m16 17 5-5-5-5" />
		<path d="M21 12H9" />
	</Icon>
);
