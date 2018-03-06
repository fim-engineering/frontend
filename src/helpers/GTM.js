const GTM = {
  pushEvent(eventName, eventCategory, eventAction, eventLabel) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: eventName,
      eventCategory,
      eventAction,
      eventLabel,
    })
  },
  pushEventName(eventName) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: eventName,
    })
  },
  pushEventCustom(eventName, eventCategory, eventAction, eventLabel,
                  customDimension1, customDimensionIndex1, customDimension2, customDimensionIndex2) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: eventName,
      eventCategory,
      eventAction,
      eventLabel,
      [customDimensionIndex1]: customDimension1,
      [customDimensionIndex2]: customDimension2,
    })
  },
  pushObject(object) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(object)
  },
  handleTags: function () {
    // Click tag
    eventListener(document, 'click touchend gtm', '[data-click]', function () {
      if (!this.dataset.clicked || this.dataset.repeatable) {
        let eventObject = this.getAttribute('data-click')

        try {
          eventObject = JSON.parse(eventObject)
        } catch (e) {
          // Empty
        }

        this.dataset.clicked = true
        GTM.pushObject(eventObject)
      }
    })

    // Impression
    eventListener(document, 'resize scroll load gtm', function () {
      // TODO: Find a better way to handle element visibility change
      let impressions = Array.from(document.querySelectorAll('[data-impression]'));

      if (impressions && Array.isArray(impressions) && impressions.length > 0) {
        impressions.forEach(function (el) {
          if (el.dataset && !el.dataset.visible && isInViewPort(el)) {
            let eventObject = el.getAttribute('data-impression')

            if (!eventObject) {
              return;
            }
            try {
              eventObject = JSON.parse(eventObject)
            } catch (e) {
              console.log("masuk error")
              // Empty
            }
            el.dataset.visible = true
            GTM.pushObject(eventObject)
          }
        });
      }
    })
  }
}

export default GTM