window.addEventListener('DOMContentLoaded', function () {
    var $ = jQuery; // Custom Image uploader for listing image
    // Set all variables to be used in scope
  
    var frame;
    var selection;
    var multiple_image = true;
    var metaBox = $('#gallery_upload'); // meta box id here
  
    var addImgLink = metaBox.find('#listing_image_btn');
    var delImgLink = metaBox.find('#delete-custom-img');
    var imgContainer = metaBox.find('.listing-img-container'); // toggle_section
  
    function toggle_section(show_if_value, subject_elm, terget_elm) {
      if (show_if_value === subject_elm.val()) {
        terget_elm.show();
      } else {
        terget_elm.hide();
      }
    } // ADD IMAGE LINK
  
  
    $('body').on('click', '#listing_image_btn', function (event) {
      event.preventDefault(); // If the media frame already exists, reopen it.
  
      if (frame) {
        frame.open();
        return;
      } // Create a new media frame
  
  
      frame = wp.media({
        title: directorist_admin.i18n_text.upload_image,
        button: {
          text: directorist_admin.i18n_text.choose_image
        },
        library: {
          type: 'image'
        },
        // only allow image upload only
        multiple: multiple_image // Set to true to allow multiple files to be selected. it will be set based on the availability of Multiple Image extension
  
      }); // When an image is selected in the media frame...
  
      frame.on('select', function () {
        /* get the image collection array if the MI extension is active */
  
        /* One little hints: a constant can not be defined inside the if block */
        if (multiple_image) {
          selection = frame.state().get('selection').toJSON();
        } else {
          selection = frame.state().get('selection').first().toJSON();
        }
  
        var data = ''; // create a placeholder to save all our image from the selection of media uploader
        // if no image exist then remove the place holder image before appending new image
  
        if ($('.single_attachment').length === 0) {
          $('.listing-img-container').html('');
        } // handle multiple image uploading.......
  
  
        if (multiple_image) {
          $(selection).each(function () {
            // here el === this
            // append the selected element if it is an image
            if (this.type === 'image') {
              // we have got an image attachment so lets proceed.
              // target the input field and then assign the current id of the attachment to an array.
              data += '<div class="single_attachment">';
              data += "<input class=\"listing_image_attachment\" name=\"listing_img[]\" type=\"hidden\" value=\"".concat(this.id, "\">");
              data += "<img style=\"width: 100%; height: 100%;\" src=\"".concat(this.url, "\" alt=\"Listing Image\" /> <span class=\"remove_image fa fa-times\" title=\"Remove it\"></span></div>");
            }
          });
        } else {
          // Handle single image uploading
          // add the id to the input field of the image uploader and then save the ids in the database as a post meta
          // so check if the attachment is really an image and reject other types
          if (selection.type === 'image') {
            // we have got an image attachment so lets proceed.
            // target the input field and then assign the current id of the attachment to an array.
            data += '<div class="single_attachment">';
            data += "<input class=\"listing_image_attachment\" name=\"listing_img[]\" type=\"hidden\" value=\"".concat(selection.id, "\">");
            data += "<img style=\"width: 100%; height: 100%;\" src=\"".concat(selection.url, "\" alt=\"Listing Image\" /> <span class=\"remove_image  fa fa-times\" title=\"Remove it\"></span></div>");
          }
        } // If MI extension is active then append images to the listing, else only add one image replacing previous upload
  
  
        if (multiple_image) {
          $('.listing-img-container').append(data);
        } else {
          $('.listing-img-container').html(data);
        } // Un-hide the remove image link
  
  
        delImgLink.removeClass('hidden');
      }); // Finally, open the modal on click
  
      frame.open();
    }); // DELETE ALL IMAGES LINK
  
    delImgLink.on('click', function (event) {
      event.preventDefault(); // Clear out the preview image and set no image as placeholder
  
      $('.listing-img-container').html("<img src=\"".concat(directorist_admin.assets_path, "images/no-image.png\" alt=\"Listing Image\" />")); // Hide the delete image link
  
      delImgLink.addClass('hidden');
    });
    /* REMOVE SINGLE IMAGE */
  
    $(document).on('click', '.remove_image', function (e) {
      e.preventDefault();
      $(this).parent().remove(); // if no image exist then add placeholder and hide remove image button
  
      if ($('.single_attachment').length === 0) {
        $('.listing-img-container').html("<img src=\"".concat(directorist_admin.assets_path, "images/no-image.png\" alt=\"Listing Image\" /><p>No images</p> ") + "<small>(allowed formats jpeg. png. gif)</small>");
        delImgLink.addClass('hidden');
      }
    });
    var has_tagline = $('#has_tagline').val();
    var has_excerpt = $('#has_excerpt').val();
  
    if (has_excerpt && has_tagline) {
      $('.atbd_tagline_moto_field').fadeIn();
    } else {
      $('.atbd_tagline_moto_field').fadeOut();
    }
  
    if ($('.directorist-form-pricing-field').hasClass('price-type-both')) {
      $('#price').show();
      $('#price_range').hide();
    }
  
    $('.directorist_pricing_options label').on('click', function () {
      var $this = $(this);
      $this.children('input[type=checkbox]').prop('checked') == true ? $("#".concat($this.data('option'))).show() : $("#".concat($this.data('option'))).hide();
      var $sibling = $this.siblings('label');
      $sibling.children('input[type=checkbox]').prop('checked', false);
      $("#".concat($sibling.data('option'))).hide();
    });
    $('.directorist_pricing_options label').on('click', function () {
      var self = $(this);
      var current_input = self.attr('for');
      var current_field = "#".concat(self.data('option'));
      $('.directorist_pricing_options input[type=checkbox]').prop('checked', false);
      $('.directorist_pricing_options input[id=' + current_input + ']').attr('checked', true);
      $('.directory_pricing_field').hide();
      $(current_field).show();
    });
    $('#atbd_optional_field_check').on('change', function () {
      $(this).is(':checked') ? $('.atbd_tagline_moto_field').fadeIn() : $('.atbd_tagline_moto_field').fadeOut();
    });
    var imageUpload;
  
    if (imageUpload) {
      imageUpload.open();
    }
  
    $('.upload-header').on('click', function (element) {
      element.preventDefault();
      imageUpload = wp.media.frames.file_frame = wp.media({
        title: directorist_admin.i18n_text.select_prv_img,
        button: {
          text: directorist_admin.i18n_text.insert_prv_img
        }
      });
      imageUpload.open();
      imageUpload.on('select', function () {
        prv_image = imageUpload.state().get('selection').first().toJSON();
        prv_url = prv_image.id;
        prv_img_url = prv_image.url;
        $('.listing_prv_img').val(prv_url);
        $('.change_listing_prv_img').attr('src', prv_img_url);
        $('.upload-header').html('Change Preview Image');
        $('.remove_prev_img').show();
      });
      imageUpload.open();
    });
    $('.remove_prev_img').on('click', function (e) {
      $(this).hide();
      $('.listing_prv_img').attr('value', '');
      $('.change_listing_prv_img').attr('src', '');
      e.preventDefault();
    });
  
    if ($('.change_listing_prv_img').attr('src') === '') {
      $('.remove_prev_img').hide();
    } else if ($('.change_listing_prv_img').attr('src') !== '') {
      $('.remove_prev_img').show();
    } // price range
  
    /* $('#price_range').hide();
    const is_checked = $('#atbd_listing_pricing').val();
    if (is_checked === 'range') {
        $('#price').hide();
        $('#price_range').show();
    }
    $('.atbd_pricing_options label').on('click', function () {
        const $this = $(this);
        $this.children('input[type=checkbox]').prop('checked') == true
            /? $(`#${$this.data('option')}`).show()
            : $(`#${$this.data('option')}`).hide();
        const $sibling = $this.siblings('label');
        $sibling.children('input[type=checkbox]').prop('checked', false);
        $(`#${$sibling.data('option')}`).hide();
    }); */
  
  
    var avg_review = $('#average_review_for_popular').hide();
    var logged_count = $('#views_for_popular').hide();
  
    if ($('#listing_popular_by select[name="listing_popular_by"]').val() === 'average_rating') {
      avg_review.show();
      logged_count.hide();
    } else if ($('#listing_popular_by select[name="listing_popular_by"]').val() === 'view_count') {
      logged_count.show();
      avg_review.hide();
    } else if ($('#listing_popular_by select[name="listing_popular_by"]').val() === 'both_view_rating') {
      avg_review.show();
      logged_count.show();
    }
  
    $('#listing_popular_by select[name="listing_popular_by"]').on('change', function () {
      if ($(this).val() === 'average_rating') {
        avg_review.show();
        logged_count.hide();
      } else if ($(this).val() === 'view_count') {
        logged_count.show();
        avg_review.hide();
      } else if ($(this).val() === 'both_view_rating') {
        avg_review.show();
        logged_count.show();
      }
    });
    /* // Display the media uploader when "Upload Image" button clicked in the custom taxonomy "atbdp_categories"
    $( '#atbdp-categories-upload-image' ).on( 'click', function( e ) {
     if (frame) {
     frame.open();
     return;
    }
     // Create a new media frame
    frame = wp.media({
     title: directorist_admin.i18n_text.upload_cat_image,
     button: {
         text: directorist_admin.i18n_text.choose_image
     },
     library: {type: 'image'}, // only allow image upload only
     multiple: multiple_image  // Set to true to allow multiple files to be selected. it will be set based on the availability of Multiple Image extension
    });
    frame.open();
    }); */
  
    /**
     * Display the media uploader for selecting an image.
     *
     * @since    1.0.0
     */
  
    function atbdp_render_media_uploader(page) {
      var file_frame;
      var image_data;
      var json; // If an instance of file_frame already exists, then we can open it rather than creating a new instance
  
      if (undefined !== file_frame) {
        file_frame.open();
        return;
      } // Here, use the wp.media library to define the settings of the media uploader
  
  
      file_frame = wp.media.frames.file_frame = wp.media({
        frame: 'post',
        state: 'insert',
        multiple: false
      }); // Setup an event handler for what to do when an image has been selected
  
      file_frame.on('insert', function () {
        // Read the JSON data returned from the media uploader
        json = file_frame.state().get('selection').first().toJSON(); // First, make sure that we have the URL of an image to display
  
        if ($.trim(json.url.length) < 0) {
          return;
        } // After that, set the properties of the image and display it
  
  
        if (page == 'listings') {
          var html = "".concat('<tr class="atbdp-image-row">' + '<td class="atbdp-handle"><span class="dashicons dashicons-screenoptions"></span></td>' + '<td class="atbdp-image">' + '<img src="').concat(json.url, "\" />") + "<input type=\"hidden\" name=\"images[]\" value=\"".concat(json.id, "\" />") + "</td>" + "<td>".concat(json.url, "<br />") + "<a href=\"post.php?post=".concat(json.id, "&action=edit\" target=\"_blank\">").concat(atbdp.edit, "</a> | ") + "<a href=\"javascript:;\" class=\"atbdp-delete-image\" data-attachment_id=\"".concat(json.id, "\">").concat(atbdp.delete_permanently, "</a>") + "</td>" + "</tr>";
          $('#atbdp-images').append(html);
        } else {
          $('#atbdp-categories-image-id').val(json.id);
          $('#atbdp-categories-image-wrapper').html("<img src=\"".concat(json.url, "\" /><a href=\"\" class=\"remove_cat_img\"><span class=\"fa fa-times\" title=\"Remove it\"></span></a>"));
        }
      }); // Now display the actual file_frame
  
      file_frame.open();
    } // Display the media uploader when "Upload Image" button clicked in the custom taxonomy "atbdp_categories"
  
  
    $('#atbdp-categories-upload-image').on('click', function (e) {
      e.preventDefault();
      atbdp_render_media_uploader('categories');
    });
    $('#submit').on('click', function () {
      $('#atbdp-categories-image-wrapper img').attr('src', '');
      $('.remove_cat_img').remove();
    });
    $(document).on('click', '.remove_cat_img', function (e) {
      e.preventDefault();
      $(this).hide();
      $(this).prev('img').remove();
      $('#atbdp-categories-image-id').attr('value', '');
    }); // Announcement
    // ----------------------------------------------------------------------------------
    // Display Announcement Recepents
  
    var announcement_to = $('select[name="announcement_to"]');
    var announcement_recepents_section = $('#announcement_recepents');
    toggle_section('selected_user', announcement_to, announcement_recepents_section);
    announcement_to.on('change', function () {
      toggle_section('selected_user', $(this), announcement_recepents_section);
    });
    var submit_button = $('#announcement_submit .vp-input ~ span');
    var form_feedback = $('#announcement_submit .field');
    form_feedback.prepend('<div class="announcement-feedback"></div>');
    var announcement_is_sending = false; // Send Announcement
  
    submit_button.on('click', function () {
      if (announcement_is_sending) {
        console.log('Please wait...');
        return;
      }
  
      var to = $('select[name="announcement_to"]');
      var recepents = $('select[name="announcement_recepents"]');
      var subject = $('input[name="announcement_subject"]');
      var message = $('textarea[name="announcement_message"]');
      var expiration = $('input[name="announcement_expiration"]');
      var send_to_email = $('input[name="announcement_send_to_email"]');
      var fields_elm = {
        to: {
          elm: to,
          value: to.val(),
          default: 'all_user'
        },
        recepents: {
          elm: recepents,
          value: recepents.val(),
          default: null
        },
        subject: {
          elm: subject,
          value: subject.val(),
          default: ''
        },
        message: {
          elm: message,
          value: message.val(),
          default: ''
        },
        expiration: {
          elm: expiration,
          value: expiration.val(),
          default: 3
        },
        send_to_email: {
          elm: send_to_email.val(),
          value: send_to_email.val(),
          default: 1
        }
      }; // Send the form
  
      var form_data = new FormData(); // Fillup the form
  
      form_data.append('action', 'atbdp_send_announcement');
  
      for (field in fields_elm) {
        form_data.append(field, fields_elm[field].value);
      }
  
      announcement_is_sending = true;
      jQuery.ajax({
        type: 'post',
        url: directorist_admin.ajaxurl,
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function beforeSend() {
          // console.log( 'Sending...' );
          form_feedback.find('.announcement-feedback').html('<div class="form-alert">Sending the announcement, please wait..</div>');
        },
        success: function success(response) {
          // console.log( {response} );
          announcement_is_sending = false;
  
          if (response.message) {
            form_feedback.find('.announcement-feedback').html("<div class=\"form-alert\">".concat(response.message, "</div>"));
          }
        },
        error: function error(_error) {
          console.log({
            error: _error
          });
          announcement_is_sending = false;
        }
      }); // Reset Form
  
      /* for ( var field in fields_elm  ) {
      $( fields_elm[ field ].elm ).val( fields_elm[ field ].default );
      } */
    }); // ----------------------------------------------------------------------------------
    // Custom Tab Support Status
  
    $('.atbds_wrapper a.nav-link').on('click', function (e) {
      e.preventDefault(); //console.log($(this).data('tabarea'));
  
      var atbds_tabParent = $(this).parent().parent().find('a.nav-link');
      var $href = $(this).attr('href');
      $(atbds_tabParent).removeClass('active');
      $(this).addClass('active'); //console.log($(".tab-content[data-tabarea='atbds_system-info-tab']"));
  
      switch ($(this).data('tabarea')) {
        case 'atbds_system-status-tab':
          $(".tab-content[data-tabarea='atbds_system-status-tab'] >.tab-pane").removeClass('active show');
          $(".tab-content[data-tabarea='atbds_system-status-tab'] ".concat($href)).addClass('active show');
          break;
  
        case 'atbds_system-info-tab':
          $(".tab-content[data-tabarea='atbds_system-info-tab'] >.tab-pane").removeClass('active show');
          $(".tab-content[data-tabarea='atbds_system-info-tab'] ".concat($href)).addClass('active show');
          break;
  
        default:
          break;
      }
    }); // Custom Tooltip Support Added
  
    $('.atbds_tooltip').on('hover', function () {
      var toolTipLabel = $(this).data('label'); //console.log(toolTipLabel);
  
      $(this).find('.atbds_tooltip__text').text(toolTipLabel);
      $(this).find('.atbds_tooltip__text').addClass('show');
    });
    $('.atbds_tooltip').on('mouseleave', function () {
      $('.atbds_tooltip__text').removeClass('show');
    });
    var directory_type = $('select[name="directory_type"]').val();
  
    if (directory_type) {
      admin_listing_form(directory_type);
    }
  
    var localized_data = directorist_admin.add_listing_data;
    $('body').on('change', 'select[name="directory_type"]', function () {
      $(this).parent('.inside').append("<span class=\"directorist_loader\"></span>");
      admin_listing_form($(this).val());
      $(this).closest('#poststuff').find('#publishing-action').addClass('directorist_disable');
  
      if (!localized_data.is_admin) {
        if ($('#directorist-select-st-s-js').length) {
          pureScriptSelect('#directorist-select-st-s-js');
        }
  
        if ($('#directorist-select-st-e-js').length) {
          pureScriptSelect('#directorist-select-st-e-js');
        }
  
        if ($('#directorist-select-sn-s-js').length) {
          pureScriptSelect('#directorist-select-sn-s-js');
        }
  
        if ($('#directorist-select-mn-e-js').length) {
          pureScriptSelect('#directorist-select-sn-e-js');
        }
  
        if ($('#directorist-select-mn-s-js').length) {
          pureScriptSelect('#directorist-select-mn-s-js');
        }
  
        if ($('#directorist-select-mn-e-js').length) {
          pureScriptSelect('#directorist-select-mn-e-js');
        }
  
        if ($('#directorist-select-tu-s-js').length) {
          pureScriptSelect('#directorist-select-tu-s-js');
        }
  
        if ($('#directorist-select-tu-e-js').length) {
          pureScriptSelect('#directorist-select-tu-e-js');
        }
  
        if ($('#directorist-select-wd-s-js').length) {
          pureScriptSelect('#directorist-select-wd-s-js');
        }
  
        if ($('#directorist-select-wd-e-js').length) {
          pureScriptSelect('#directorist-select-wd-e-js');
        }
  
        if ($('#directorist-select-th-s-js').length) {
          pureScriptSelect('#directorist-select-th-s-js');
        }
  
        if ($('#directorist-select-th-e-js').length) {
          pureScriptSelect('#directorist-select-th-e-js');
        }
  
        if ($('#directorist-select-fr-s-js').length) {
          pureScriptSelect('#directorist-select-fr-s-js');
        }
  
        if ($('#directorist-select-fr-e-js').length) {
          pureScriptSelect('#directorist-select-fr-e-js');
        }
      }
    }); // Custom Field Checkbox Button More
  
    function customFieldSeeMore() {
      if ($('.directorist-custom-field-btn-more').length) {
        $('.directorist-custom-field-btn-more').each(function (index, element) {
          var fieldWrapper = $(element).closest('.directorist-custom-field-checkbox, .directorist-custom-field-radio');
          var customField = $(fieldWrapper).find('.directorist-checkbox, .directorist-radio');
          $(customField).slice(20, customField.length).slideUp();
  
          if (customField.length <= 20) {
            $(element).slideUp();
          }
        });
      }
    }
  
    function admin_listing_form(directory_type) {
      $.ajax({
        type: 'post',
        url: directorist_admin.ajaxurl,
        data: {
          action: 'atbdp_dynamic_admin_listing_form',
          directory_type: directory_type,
          listing_id: $('#directiost-listing-fields_wrapper').data('id'),
          directorist_nonce: directorist_admin.directorist_nonce
        },
        success: function success(response) {
          if (response.error) {
            console.log({
              response: response
            });
            return;
          }
  
          $('#directiost-listing-fields_wrapper').empty().append(response.data['listing_meta_fields']);
          assetsNeedToWorkInVirtualDom();
          $('#at_biz_dir-locationchecklist').empty().html(response.data['listing_locations']);
          $('#at_biz_dir-categorychecklist').empty().html(response.data['listing_categories']);
          $('#at_biz_dir-categorychecklist-pop').empty().html(response.data['listing_pop_categories']);
          $('#at_biz_dir-locationchecklist-pop').empty().html(response.data['listing_pop_locations']);
          $('.misc-pub-atbdp-expiration-time').empty().html(response.data['listing_expiration']);
          $('#listing_form_info').find('.directorist_loader').remove();
          $('select[name="directory_type"]').closest('#poststuff').find('#publishing-action').removeClass('directorist_disable');
  
          if ($('.directorist-color-field-js').length) {
            $('.directorist-color-field-js').wpColorPicker().empty();
          }
  
          window.dispatchEvent(new CustomEvent('directorist-reload-plupload'));
          window.dispatchEvent(new CustomEvent('directorist-type-change'));
  
          if (response.data['required_js_scripts']) {
            var scripts = response.data['required_js_scripts'];
  
            for (var script_id in scripts) {
              var old_script = document.getElementById(script_id);
  
              if (old_script) {
                old_script.remove();
              }
  
              var script = document.createElement('script');
              script.id = script_id;
              script.src = scripts[script_id];
              document.body.appendChild(script);
            }
          }
  
          customFieldSeeMore();
        },
        error: function error(_error2) {
          console.log({
            error: _error2
          });
        }
      });
    } // default directory type
  
  
    $('body').on('click', '.submitdefault', function (e) {
      e.preventDefault();
      $(this).children('.submitDefaultCheckbox').prop('checked', true);
      var defaultSubmitDom = $(this);
      defaultSubmitDom.closest('.directorist_listing-actions').append("<span class=\"directorist_loader\"></span>");
      $.ajax({
        type: 'post',
        url: directorist_admin.ajaxurl,
        data: {
          action: 'atbdp_listing_default_type',
          type_id: $(this).data('type-id'),
          nonce: directorist_admin.nonce
        },
        success: function success(response) {
          defaultSubmitDom.closest('.directorist_listing-actions').siblings('.directorist_notifier').append("<span class=\"atbd-listing-type-active-status\">".concat(response, "</span>"));
          defaultSubmitDom.closest('.directorist_listing-actions').children('.directorist_loader').remove();
          setTimeout(function () {
            location.reload();
          }, 500);
        }
      });
    });
  
    function assetsNeedToWorkInVirtualDom() {
      // price range
  
      /* $('#price_range').hide();
      const pricing = $('#atbd_listing_pricing').val();
      if (pricing === 'range') {
          $('#price').hide();
          $('#price_range').show();
      } */
      $('.atbd_pricing_options label').on('click', function () {
        var $this = $(this);
        $this.children('input[type=checkbox]').prop('checked') == true ? $("#".concat($this.data('option'))).show() : $("#".concat($this.data('option'))).hide();
        var $sibling = $this.siblings('label');
        $sibling.children('input[type=checkbox]').prop('checked', false);
        $("#".concat($sibling.data('option'))).hide();
      });
      $('.directorist_pricing_options label').on('click', function () {
        var self = $(this);
        var current_input = self.attr('for');
        var current_field = "#".concat(self.data('option'));
        $('.directorist_pricing_options input[type=checkbox]').prop('checked', false);
        $('.directorist_pricing_options input[id=' + current_input + ']').attr('checked', true);
        $('.directory_pricing_field').hide();
        $(current_field).show();
      });
      var imageUpload;
  
      if (imageUpload) {
        imageUpload.open();
        return;
      }
  
      $('.upload-header').on('click', function (element) {
        element.preventDefault();
        imageUpload = wp.media.frames.file_frame = wp.media({
          title: directorist_admin.i18n_text.select_prv_img,
          button: {
            text: directorist_admin.i18n_text.insert_prv_img
          }
        });
        imageUpload.open();
        imageUpload.on('select', function () {
          prv_image = imageUpload.state().get('selection').first().toJSON();
          prv_url = prv_image.id;
          prv_img_url = prv_image.url;
          $('.listing_prv_img').val(prv_url);
          $('.change_listing_prv_img').attr('src', prv_img_url);
          $('.upload-header').html('Change Preview Image');
          $('.remove_prev_img').show();
        });
        imageUpload.open();
      });
      $('.remove_prev_img').on('click', function (e) {
        $(this).hide();
        $('.listing_prv_img').attr('value', '');
        $('.change_listing_prv_img').attr('src', '');
        e.preventDefault();
      });
  
      if ($('.change_listing_prv_img').attr('src') === '') {
        $('.remove_prev_img').hide();
      } else if ($('.change_listing_prv_img').attr('src') !== '') {
        $('.remove_prev_img').show();
      }
      /* Show and hide manual coordinate input field */
  
  
      if (!$('input#manual_coordinate').is(':checked')) {
        $('.directorist-map-coordinates').hide();
      }
  
      $('#manual_coordinate').on('click', function (e) {
        if ($('input#manual_coordinate').is(':checked')) {
          $('.directorist-map-coordinates').show();
        } else {
          $('.directorist-map-coordinates').hide();
        }
      });
    }
  });