{{> cards/card_component componentName='offercards' }}

class offercardsCardComponent extends BaseCard['offercards'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }

  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param profile profile of the entity in the card
   */
   dataForRender(profile) {
    let imageUrl = '';
    let alternateText = '';
    if (profile.primaryPhoto && profile.primaryPhoto[0]) {
      imageUrl = Formatter.image(profile.primaryPhoto[0]).url;
      alternateText = Formatter.image(profile.primaryPhoto[0]).alternateText;
    }
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_top';
        
    return {
      title: profile.name, // The header text of the card
      url: profile.website || profile.landingPageUrl, // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      image: profile.photoGallery ? profile.photoGallery[0].image.url : null, // The URL of the image to display on the card
      // altText: '', // The alternate text for the image
      titleEventOptions: this.addDefaultEventOptions(),
      //fortext:'Eligible Offer On :- ' + profile.c_for,
      // subtitle: '', // The sub-header text of the card
      details: profile.description, // The text in the body of the card
      // If the card's details are longer than a certain character count, you can truncate the
      // text. A toggle will be supplied that can show or hide the truncated text.
     
      showMoreDetails: {
        showMoreLimit: 150, // Character count limit
        // showMoreText: 'Show more', // Label when toggle will show truncated text
        // showLessText: 'Show less' // Label when toggle will hide truncated text
      },
      // The primary CTA of the card
      CTA1: {
        label: 'SEE MORE', // The CTA's label
        //iconName: 'chevron', // The icon to use for the CTA
        url: profile.c_cTASeeMore ? profile.c_cTASeeMore.link : '#', // The URL a user will be directed to when clicking
        target: linkTarget, // Where the new URL will be opened
        eventType: 'CTA_CLICK', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      // The secondary CTA of the card
      CTA2: {
        label: profile.c_secondaryCTA ? profile.c_secondaryCTA.label : null,
        //iconName: 'chevron',
        url: Formatter.generateCTAFieldTypeLink(profile.c_secondaryCTA),
        target: linkTarget,
        eventType: 'CTA_CLICK',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      },
      feedback: false, // Shows thumbs up/down buttons to provide feedback on the result card
      feedbackTextOnSubmission: 'Thanks!', // Text to display after a thumbs up/down is clicked
      positiveFeedbackSrText: 'This answered my question', // Screen reader only text for thumbs-up
      negativeFeedbackSrText: 'This did not answer my question' // Screen reader only text for thumbs-down
    };
  }

  /**
   * The template to render
   * @returns {string}
   * @override
   */
  static defaultTemplateName (config) {
    return 'cards/offercards';
  }
}

ANSWERS.registerTemplate(
  'cards/offercards',
  {{{stringifyPartial (read 'cards/offercards/template') }}}
);
ANSWERS.registerComponentType(offercardsCardComponent);
