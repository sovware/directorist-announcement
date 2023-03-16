<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\DA;

class DA_Settings
{

	protected static $instance = null;

	public function __construct()
	{
		/*show the select box form field to select an icon*/
		add_filter('atbdp_tools_submenu', [$this, 'announcement_menu']);
		add_filter('atbdp_listing_type_settings_field_list', [$this, 'register_setting_fields']);
		add_filter('atbdp_listing_settings_user_dashboard_sections', [$this, 'setting_fields_tab']);
	}

	public static function instance()
	{
		if (null == self::$instance) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public static function announcement_menu($fields)
	{
		$announcement['announcement_settings'] = [
			'label'     => __('Announcement', 'directorist'),
			'icon' => '<i class="fa fa-bullhorn"></i>',
			'sections'  => apply_filters('atbdp_announcement_settings_controls', [
				'send-announcement'     => [
					'fields'        => [
						'announcement',
					]
				],
			]),
		];

		$fields = array_merge($announcement, $fields);

		return $fields;
	}

	public static function register_setting_fields($fields = [])
	{
		$users = get_users(
			array(
				'role__not_in' => 'Administrator',   // Administrator | Subscriber
				'number'       => apply_filters('directorist_announcement_user_query_num', 1000),
			)
		);
		$recipient = [];

		if (!empty($users)) {
			foreach ($users as $user) {
				$recipient[] = [
					'value' => $user->user_email,
					'label' => (!empty($user->display_name)) ? $user->display_name : $user->user_nicename,
				];
			}
		}

		$fields['announcement'] = [
			'type'                       => 'ajax-action',
			'action'                     => 'atbdp_send_announcement',
			'label'                      => '',
			'button-label'               => 'Send',
			'button-label-on-processing' => '<i class="fas fa-circle-notch fa-spin"></i> Sending',
			'option-fields' => [
				'to' => [
					'type' => 'select',
					'label' => 'To',
					'options' => [
						['value' => 'all_user', 'label' => 'All User'],
						['value' => 'selected_user', 'label' => 'Selected User'],
					],
					'value' => 'all_user',
				],
				'recipient' => [
					'type'    => 'checkbox',
					'label'   => 'Recipients',
					'options' => $recipient,
					'value'   => '',
					'show-if' => [
						'where' => "self.to",
						'conditions' => [
							['key' => 'value', 'compare' => '=', 'value' => 'selected_user'],
						],
					],
				],
				'subject' => [
					'type'  => 'text',
					'label' => 'Subject',
					'value' => '',
				],
				'message' => [
					'type'        => 'textarea',
					'label'       => 'Message',
					'description' => 'Maximum 400 characters are allowed',
					'value'       => '',
				],
				'expiration' => [
					'type'  => 'range',
					'min'   => '0',
					'max'   => '365',
					'label' => 'Expires in Days',
					'value' => 0,
				],
				'send_to_email' => [
					'type'  => 'toggle',
					'label' => 'Send a copy to email',
					'value' => true,
				],
				'nonce' => [
					'type'  => 'hidden',
					'value' => wp_create_nonce(directorist_get_nonce_key()),
				],
			],
			'value' => '',
			'save-option-data' => false,
		];

		$fields['listing_import_button'] = [
			'announcement_to' => [
				'label'     => __('To', 'directorist'),
				'type'      => 'select',
				'value'     => 'all_user',
				'options'   => [
					[
						'value' => 'all_user',
						'label' => __('All User', 'directorist')
					],
					[
						'value' => 'selected_user',
						'label' => __('Selected User', 'directorist')
					]
				]
			],

			'announcement_subject' => [
				'label' => __('Subject', 'directorist'),
				'type'  => 'text',
				'value' => false
			],

			'announcement_send_to_email' => [
				'label'   => __('Send a copy to email', 'directorist'),
				'type'    => 'toggle',
				'value' => true,
			],
			'announcement_tab' => [
				'type'  => 'toggle',
				'label' => __('Display Announcements Tab', 'directorist'),
				'value' => true,
			],
			'announcement_tab_text'    => [
				'type'          => 'text',
				'label'         => __('"Announcement" Tab Label', 'directorist'),
				'value'         => __('Announcements', 'directorist'),
				'show-if' => [
					'where' => "announcement_tab",
					'conditions' => [
						['key' => 'value', 'compare' => '=', 'value' => true],
					],
				],
			],
		];

		return $fields;
	}

	public static function setting_fields_tab($fields = [])
	{
		$array_fields = is_array($fields['general_dashboard']['fields']) ? $fields['general_dashboard']['fields'] : [];
		array_push($array_fields, 'announcement_tab', 'announcement_tab_text');
		return $fields;
	}
}

DA_Settings::instance();
