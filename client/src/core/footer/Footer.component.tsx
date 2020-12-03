import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import SaveIcon from '@material-ui/icons/Save';
import GearIcon from '@material-ui/icons/Settings';
import { HtmlTooltip } from '~components/tooltips';
import styles from './Footer.scss';
import { Github } from '~components/icons';
import ActivePacketsList from '../generationPanel/ActivePacketsList.container';
import PanelControls from '../generator/panelControls/PanelControls.container';
import SaveDataSetDialog from '~core/dialogs/saveDataSet/SaveDataSet.container';
import Link from '~components/Link';
import { GDLocale } from '~types/general';
import C from '../constants';
import useOnClickOutside from 'use-onclickoutside';

export type FooterProps = {
	locale: GDLocale;
	i18n: any;
	scriptVersion: string;
	onChangeLocale: (a: any) => void;
	onGenerate: () => void;
	onSave: () => void;
	isEnabled: boolean;
	currentPage: string;
	availableLocales: GDLocale[];
};

// TODO move
const allLocaleOptions = [
	{ value: 'ar', label: 'عربى' },
	{ value: 'de', label: 'Deutsch' },
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Español' },
	{ value: 'fr', label: 'Français' },
	{ value: 'nl', label: 'Nederlands' },
	{ value: 'ja', label: '日本人' },
	{ value: 'ta', label: 'தமிழ்' },
	{ value: 'zh', label: '中文' }
];

const useListStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360
		}
	})
);

const Footer = ({
	i18n, locale, isEnabled, onChangeLocale, scriptVersion, onSave, onGenerate, currentPage, availableLocales
}: FooterProps): JSX.Element => {
	const popoverRef = React.useRef(null);
	const [localeTooltipVisible, setLocaleTooltipVisibility] = React.useState(false);
	const listClasses = useListStyles();

	useOnClickOutside(popoverRef, () => {
		setLocaleTooltipVisibility(false);
	});

	const getLocaleSelector = (): JSX.Element | null => {
		if (availableLocales.length < 1) {
			return null;
		}

		return (
			<li>
				<HtmlTooltip
					arrow
					open={localeTooltipVisible}
					placement="top"
					disableFocusListener
					disableHoverListener
					disableTouchListener
					interactive
					title={
						<div className={listClasses.root} ref={popoverRef}>
							<List>
								{allLocaleOptions.map((currLocale: any): JSX.Element => (
									<ListItem
										button
										key={currLocale.value}
										className={locale === currLocale.value ? styles.selectedLocale : ''}
										onClick={(): void => onChangeLocale(currLocale.value)}>
										<ListItemText primary={currLocale.label} />
									</ListItem>
								))}
							</List>
						</div>
					}
				>
					<LanguageIcon fontSize="large" onClick={(): void => setLocaleTooltipVisibility(true)} />
				</HtmlTooltip>
			</li>
		);
	};

	// we always show the login button
	const getSaveButton = (): JSX.Element | null => (
		<Button onClick={onSave} className={styles.saveButton} variant="contained" disableElevation disabled={!isEnabled}>
			<SaveIcon />
			{i18n.save}
		</Button>
	);

	let generatorControlsClasses = styles.generatorControls;
	if (currentPage === process.env.GD_GENERATOR_PATH) {
		generatorControlsClasses += ` ${styles.visible}`;
	}

	return (
		<>
			<footer className={styles.footer}>
				<div>
					<ul>
						<li>
							<Link url={C.GITHUB_URL} offSite={true}>
								<Github />
							</Link>
						</li>
						{getLocaleSelector()}
						<li className={styles.scriptVersion}>
							<a href={C.CHANGELOG_URL} target="_blank" rel="noopener noreferrer">{scriptVersion}</a>
						</li>
						<li>
							<ActivePacketsList />
						</li>
					</ul>

					<div className={generatorControlsClasses}>
						<PanelControls className={styles.controls} />
						{getSaveButton()}
						<Button
							onClick={onGenerate}
							className={styles.generateButton}
							variant="contained"
							color="primary"
							disableElevation
							disabled={!isEnabled}
						>
							<GearIcon />
							{i18n.generate}
						</Button>
					</div>
				</div>
			</footer>
			<SaveDataSetDialog />
		</>
	);
};

export default Footer;
