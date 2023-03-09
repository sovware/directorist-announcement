/***/ "./assets/src/js/public/components/dashboard/dashboardAnnouncement.js":
/*!****************************************************************************!*\
  !*** ./assets/src/js/public/components/dashboard/dashboardAnnouncement.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

    (function ($) {
      window.addEventListener('DOMContentLoaded', function () {
        // Clear seen Announcements
        var cleared_seen_announcements = false;
        $('.directorist-tab__nav__link').on('click', function () {
          if (cleared_seen_announcements) {
            return;
          }
    
          var target = $(this).attr('target');
    
          if ('dashboard_announcement' === target) {
            // console.log( target, 'clear seen announcements' );
            $.ajax({
              type: "post",
              url: directorist.ajaxurl,
              data: {
                action: 'atbdp_clear_seen_announcements'
              },
              success: function success(response) {
                // console.log( response );
                if (response.success) {
                  cleared_seen_announcements = true;
                  $('.directorist-announcement-count').removeClass('show');
                  $('.directorist-announcement-count').html('');
                }
              },
              error: function error(_error) {
                console.log({
                  error: _error
                });
              }
            });
          }
        }); // Closing the Announcement
    
        var closing_announcement = false;
        $('.close-announcement').on('click', function (e) {
          e.preventDefault();
    
          if (closing_announcement) {
            // console.log('Please wait...');
            return;
          }
    
          var post_id = $(this).closest('.directorist-announcement').data('post-id');
          var form_data = {
            action: 'atbdp_close_announcement',
            post_id: post_id,
            nonce: directorist.directorist_nonce
          };
          var button_default_html = $(self).html();
          closing_announcement = true;
          var self = this;
          $.ajax({
            type: "post",
            url: directorist.ajaxurl,
            data: form_data,
            beforeSend: function beforeSend() {
              $(self).html('<span class="fas fa-spinner fa-spin"></span> ');
              $(self).addClass('disable');
              $(self).attr('disable', true);
            },
            success: function success(response) {
              // console.log( { response } );
              closing_announcement = false;
              $(self).removeClass('disable');
              $(self).attr('disable', false);
    
              if (response.success) {
                $('.announcement-id-' + post_id).remove();
    
                if (!$('.announcement-item').length) {
                  location.reload();
                }
              } else {
                $(self).html('Close');
              }
            },
            error: function error(_error2) {
              console.log({
                error: _error2
              });
              $(self).html(button_default_html);
              $(self).removeClass('disable');
              $(self).attr('disable', false);
              closing_announcement = false;
            }
          });
        });
      });
    })(jQuery);
    
/***/ });

    /* harmony import */ var _components_dashboard_dashboardAnnouncement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/dashboard/dashboardAnnouncement */ "./assets/src/js/public/components/dashboard/dashboardAnnouncement.js");
/* harmony import */ var _components_dashboard_dashboardAnnouncement__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_dashboard_dashboardAnnouncement__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_dashboard_dashboardBecomeAuthor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/dashboard/dashboardBecomeAuthor */ "./assets/src/js/public/components/dashboard/dashboardBecomeAuthor.js");
/* harmony import */ var _components_dashboard_dashboardBecomeAuthor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_dashboard_dashboardBecomeAuthor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_pureScriptTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/pureScriptTab */ "./assets/src/js/public/components/pureScriptTab.js");
/* harmony import */ var _components_pureScriptTab__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_components_pureScriptTab__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_profileForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/profileForm */ "./assets/src/js/public/components/profileForm.js");
/* harmony import */ var _components_profileForm__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_components_profileForm__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/tab */ "./assets/src/js/public/components/tab.js");
/* harmony import */ var _components_tab__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_components_tab__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_directoristDropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/directoristDropdown */ "./assets/src/js/public/components/directoristDropdown.js");
/* harmony import */ var _components_directoristDropdown__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_components_directoristDropdown__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_directoristSelect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/directoristSelect */ "./assets/src/js/public/components/directoristSelect.js");
/* harmony import */ var _components_directoristSelect__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_components_directoristSelect__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_legacy_support__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/legacy-support */ "./assets/src/js/public/components/legacy-support.js");
/* harmony import */ var _components_legacy_support__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_components_legacy_support__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_directoristFavorite__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/directoristFavorite */ "./assets/src/js/public/components/directoristFavorite.js");
/* harmony import */ var _components_directoristFavorite__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_components_directoristFavorite__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_directoristAlert__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/directoristAlert */ "./assets/src/js/public/components/directoristAlert.js");
/* harmony import */ var _components_directoristAlert__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_components_directoristAlert__WEBPACK_IMPORTED_MODULE_14__);