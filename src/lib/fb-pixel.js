export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

// Standard Facebook Pixel Events
// https://developers.facebook.com/docs/meta-pixel/reference

/**
 * ViewContent - Track product views
 * @param {Object} params - { content_name, content_ids, content_type, value, currency }
 */
export const viewContent = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel ViewContent:', params);
    window.fbq("track", "ViewContent", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * AddToCart - Track when items are added to cart
 * @param {Object} params - { content_name, content_ids, content_type, value, currency }
 */
export const addToCart = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel AddToCart:', params);
    window.fbq("track", "AddToCart", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * InitiateCheckout - Track when checkout process begins
 * @param {Object} params - { content_ids, contents, value, currency, num_items }
 */
export const initiateCheckout = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel InitiateCheckout:', params);
    window.fbq("track", "InitiateCheckout", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * Purchase - Track completed purchases
 * @param {Object} params - { value, currency, content_ids, content_type, contents, num_items }
 */
export const purchase = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel Purchase:', params);
    window.fbq("track", "Purchase", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * Search - Track search queries
 * @param {Object} params - { search_string, content_category, content_ids }
 */
export const search = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel Search:', params);
    window.fbq("track", "Search", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * CompleteRegistration - Track user signups
 * @param {Object} params - { content_name, status, value, currency }
 */
export const completeRegistration = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel CompleteRegistration:', params);
    window.fbq("track", "CompleteRegistration", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * AddPaymentInfo - Track when payment info is added
 * @param {Object} params - { content_category, content_ids, value, currency }
 */
export const addPaymentInfo = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel AddPaymentInfo:', params);
    window.fbq("track", "AddPaymentInfo", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * Lead - Track lead generation
 * @param {Object} params - { content_name, value, currency }
 */
export const lead = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel Lead:', params);
    window.fbq("track", "Lead", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};

/**
 * Contact - Track contact form submissions
 * @param {Object} params - { content_name }
 */
export const contact = (params) => {
  if (typeof window !== "undefined" && window.fbq) {
    console.log('FB Pixel Contact:', params);
    window.fbq("track", "Contact", params);
  } else {
    console.warn('Facebook Pixel not loaded');
  }
};
