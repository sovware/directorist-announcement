<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\DA;

class DA_Settings {


	protected static $instance = null;

	public function __construct() {
		 /*show the select box form field to select an icon*/
		add_filter( 'atbdp_extension_settings_submenu', array( $this, 'announcement_menu' ) );
		add_filter( 'atbdp_listing_type_settings_field_list', array( $this, 'register_setting_fields' ) );
		add_filter( 'atbdp_listing_settings_user_dashboard_sections', array( $this, 'setting_fields_tab' ) );
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public static function announcement_menu( $submenu ) {
		$submenu['announcement_settings'] = array(
			'label'     => __( 'Announcement', 'directorist-announcement' ),
			'icon'      => '<i class="fa fa-bullhorn"></i>',
			'sections'  => apply_filters(
				'atbdp_announcement_settings_controls',
				array(
					'send-announcement' => array(
						'fields' => array(
							'announcement',
						),
					),
				)
			),
		);

		return $submenu;
	}

	public static function register_setting_fields( $fields = array() ) {
		$users     = get_users(
			array(
				'role__not_in' => 'Administrator',   // Administrator | Subscriber
				'number'       => apply_filters( 'directorist_announcement_user_query_num', 1000 ),
			)
		);
		$recipient = array();

		if ( ! empty( $users ) ) {
			foreach ( $users as $user ) {
				$recipient[] = array(
					'value' => $user->user_email,
					'label' => ( ! empty( $user->display_name ) ) ? $user->display_name : $user->user_nicename,
				);
			}
		}

		$fields['announcement'] = array(
			'type'                       => 'ajax-action',
			'action'                     => 'atbdp_send_announcement',
			'label'                      => '',
			'button-label'               => 'Send',
			'button-label-on-processing' => '<i class="fas fa-circle-notch fa-spin"></i> Sending',
			'option-fields'              => array(
				'to' => array(
					'type'    => 'select',
					'label'   => 'To',
					'options' => array(
						array(
							'value' => 'all_user',
							'label' => 'All User',
						),
						array(
							'value' => 'selected_user',
							'label' => 'Selected User',
						),
					),
					'value'   => 'all_user',
				),
				'recipient' => array(
					'type'    => 'checkbox',
					'label'   => 'Recipients',
					'options' => $recipient,
					'value'   => '',
					'show-if' => array(
						'where'      => 'self.to',
						'conditions' => array(
							array(
								'key'     => 'value',
								'compare' => '=',
								'value'   => 'selected_user',
							),
						),
					),
				),
				'subject' => array(
					'type'  => 'text',
					'label' => 'Subject',
					'value' => '',
				),
				'message' => array(
					'type'        => 'textarea',
					'label'       => 'Message',
					'description' => 'Maximum 400 characters are allowed',
					'value'       => '',
				),
				'expiration' => array(
					'type'  => 'range',
					'min'   => '0',
					'max'   => '365',
					'label' => 'Expires in Days',
					'value' => 0,
				),
				'send_to_email' => array(
					'type'  => 'toggle',
					'label' => 'Send a copy to email',
					'value' => true,
				),
				'nonce' => array(
					'type'  => 'hidden',
					'value' => wp_create_nonce( directorist_get_nonce_key() ),
				),
			),
			'value'                      => '',
			'save-option-data'           => false,
		);

		return $fields;
	}

	public static function setting_fields_tab( $fields = array() ) {

		$array_fields = isset( $fields['general_dashboard'] ) && is_array( $fields['general_dashboard']['fields'] ) ? $fields['general_dashboard']['fields'] : array();

		array_push( $array_fields, 'announcement_tab', 'announcement_tab_text' );
		return $fields;
	}
}

DA_Settings::instance();
