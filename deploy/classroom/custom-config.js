// MrSEO Classroom: appended to the server's config.js.
config.defaultLogoUrl = 'images/mrseo-logo.png';
config.disableDeepLinking = true; // phones stay in the browser, no app prompt
config.welcomePage = { disabled: true };
config.prejoinConfig = { enabled: true, hideExtraJoinButtons: ['no-audio', 'by-phone'] };
config.disableInviteFunctions = true;
config.doNotStoreRoom = true;
config.disableThirdPartyRequests = true; // no outside services (avatars, stats)
config.analytics = { disabled: true };
config.feedbackPercentage = 0;
config.giphy = { enabled: false };
config.readOnlyName = true;
config.defaultRemoteDisplayName = 'Student';
config.localRecording = { disable: false, notifyAllParticipants: true };
config.deploymentUrls = { userDocumentationURL: 'https://mrseo.pk/contact/' };
config.startWithAudioMuted = true;
config.startWithVideoMuted = true;
// Voice, screen sharing and chat only: no cameras.
config.toolbarButtons = ['microphone', 'chat', 'raisehand', 'reactions', 'participants-pane', 'settings', 'fullscreen', 'hangup'];
config.disableSelfView = true;
config.desktopSharingFrameRate = { min: 5, max: 15 };
