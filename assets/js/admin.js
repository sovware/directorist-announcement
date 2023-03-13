(function ($) {
  window.addEventListener('DOMContentLoaded', () => {
    // Announcement
    // ----------------------------------------------------------------------------------
    // Display Announcement Recepents
    const announcement_to = $('select[name="announcement_to"]');
    const announcement_recepents_section = $('#announcement_recepents');
    toggle_section('selected_user', announcement_to, announcement_recepents_section);
    announcement_to.on('change', function () {
        toggle_section('selected_user', $(this), announcement_recepents_section);
    });

    // toggle_section
    function toggle_section(show_if_value, subject_elm, terget_elm) {
      if (show_if_value === subject_elm.val()) {
          terget_elm.show();
      } else {
          terget_elm.hide();
      }
  }

    const submit_button = $('#announcement_submit .vp-input ~ span');
    const form_feedback = $('#announcement_submit .field');
    form_feedback.prepend('<div class="announcement-feedback"></div>');

    let announcement_is_sending = false;

    // Send Announcement
    submit_button.on('click', function () {
      if (announcement_is_sending) {
          console.log('Please wait...');
          return;
      }

      const to = $('select[name="announcement_to"]');
      const recepents = $('select[name="announcement_recepents"]');
      const subject = $('input[name="announcement_subject"]');
      const message = $('textarea[name="announcement_message"]');
      const expiration = $('input[name="announcement_expiration"]');
      const send_to_email = $('input[name="announcement_send_to_email"]');

      const fields_elm = {
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
          },
      };

      // Send the form
      const form_data = new FormData();

      // Fillup the form
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
          beforeSend() {
              // console.log( 'Sending...' );
              form_feedback
                  .find('.announcement-feedback')
                  .html('<div class="form-alert">Sending the announcement, please wait..</div>');
          },
          success(response) {
              // console.log( {response} );
              announcement_is_sending = false;

              if (response.message) {
                  form_feedback
                      .find('.announcement-feedback')
                      .html(`<div class="form-alert">${response.message}</div>`);
              }
          },
          error(error) {
              console.log({
                  error
              });
              announcement_is_sending = false;
          },
      });
    });
  });
})(jQuery)