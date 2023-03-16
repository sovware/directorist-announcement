<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\DA;

use Directorist_Announcement;

class DA_Frontend {


	protected static $instance = null;

	public function __construct() {
		 /*show the select box form field to select an icon*/
		add_filter( 'directorist_dashboard_tabs', array( $this, 'dashboard_tabs' ), 10, 2 );
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function dashboard_tabs( $dashboard_tabs, $args ) {
		// Tabs
		$announcement_tab = get_directorist_option( 'announcement_tab', 1 );
		
		if ( $announcement_tab ) {

			ob_start();
			Directorist_Announcement::get_template( 'template-parts/list', array( 'dashboard' => $args ) );
			$content = ob_get_clean();

			$dashboard_tabs['dashboard_announcement'] = array(
				'title'    => DA_Helpers::get_announcement_label(),
				'content'  => $content,
				'icon'     => 'las la-bullhorn',
			);
		}
		return $dashboard_tabs;
	}
}

DA_Frontend::instance();
