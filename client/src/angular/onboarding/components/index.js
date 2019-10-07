import angular from 'angular';
import onboardingCommonCss from './css/onboarding-common.css';
import onboardingAdminViewComponent from './onboarding-admin-view/onboarding-admin-view.component';
import onboardingSetupViewComponent from './onboarding-setup-view/onboarding-setup-view.component';
import onboardingSetupStateComponent from './onboarding-setup-state/onboarding-setup-state.component';
import onboardingInfoModalComponent from './onboarding-info-modal/onboarding-info-modal.component';

const mod = angular.module('portal.onboarding.components', [
    'portal.onboarding.services'
]);

mod.component('onboardingAdminView', onboardingAdminViewComponent);
mod.component('onboardingSetupView', onboardingSetupViewComponent);
mod.component('onboardingSetupState', onboardingSetupStateComponent);
mod.component('onboardingInfoModal', onboardingInfoModalComponent);

export default mod;