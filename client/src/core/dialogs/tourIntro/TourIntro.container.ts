import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TourIntroDialog, { TourDialogProps } from './TourIntro.component';
import * as selectors from '~store/generator/generator.selectors';
import * as mainSelectors from '~store/main/main.selectors';
import * as mainActions from '~store/main/main.actions';

const mapStateToProps = (state: any): Partial<TourDialogProps> => ({
	i18n: selectors.getCoreI18n(state),
	tourIntroDialogVisible: mainSelectors.tourIntroDialogVisible(state),
	tourBundleLoaded: mainSelectors.isTourBundleLoaded(state)
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<TourDialogProps> => ({
	loadTourBundle: (): any => dispatch(mainActions.loadTourBundle()),

	// @ts-ignore-line
	onClose: (): any => dispatch(mainActions.hideTourIntroDialog()),

	// onStartTour: () => dispatch(mainActions.startTour()),

	// @ts-ignore-line
	onCompleteTour: (): any => dispatch(mainActions.showTourIntroDialog())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TourIntroDialog);
