<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\DA;

use Directorist\Directorist_Listing_Dashboard;
use Directorist_Announcement;

class DA_Frontend {


	protected static $instance = null;

	public function __construct() {
		 /*show the select box form field to select an icon*/
		add_filter( 'directorist_dashboard_tabs', array( $this, 'dashboard_tabs' ) );
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function dashboard_tabs( $dashboard_tabs ) {

		$dashboard_class = Directorist_Listing_Dashboard::instance();
		// Tabs
		$announcement_tab = get_directorist_option( 'announcement_tab', 1 );
		
		if ( $announcement_tab ) {

			ob_start();
			Directorist_Announcement::get_template( 'template-parts/list', array( 'dashboard' => $dashboard_class ) );
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
