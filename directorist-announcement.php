<?php
/*
Plugin Name:    Directorist Announcement
Plugin URI:     https://directorist.com
Description:    Make an announcement to all the users or any selected users on your site.
Version:        1.0
Author:         wpWax
Author URI:     https://directorist.com/
*/

defined('ABSPATH') || die('No direct script access allowed!');

if ( ! defined('DIRECTORIST_ANNOUNCEMENT_VERSION') ) {
	$plugin_data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
	define( 'DIRECTORIST_ANNOUNCEMENT_VERSION', $plugin_data['version'] );
}

if ( ! defined('DIRECTORIST_ANNOUNCEMENT_BASE_DIR') ) {
	define( 'DIRECTORIST_ANNOUNCEMENT_BASE_DIR',  plugin_dir_path( __FILE__ ) );
}

if ( ! class_exists( 'Directorist_Announcement' ) ) {

	final class Directorist_Announcement {

		private static $instance;

		public static function instance() {

			if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Directorist_Announcement ) ) {
				self::$instance = new Directorist_Announcement();
				self::$instance->init();
			}

			return self::$instance;
		}

		public function init() {
			add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
			add_action( 'directorist_loaded', array( $this, 'includes' ) );
		}

		public static function plugins_loaded() {
			load_plugin_textdomain( 'directorist-announcement' , false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

			require_once ( ABSPATH . '/wp-admin/includes/plugin.php' );

			if ( ! is_plugin_active( 'directorist/directorist-base.php' ) ) {
				deactivate_plugins( 'directorist-announcement/directorist-announcement.php' );
				require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . '/inc/class-warning-notice.php';
			}
		}

		public function includes() {
			require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . 'inc/helpers.php';
			require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . 'inc/settings.php';
			require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . 'inc/frontend.php';
			require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . 'inc/content-update.php';
		}

		public static function get_template( $template_file, $args = array() ) {
			if ( is_array( $args ) ) {
				extract( $args );
			}
	
			$file = DIRECTORIST_ANNOUNCEMENT_BASE_DIR . $template_file . '.php';
	
			if ( file_exists( $file ) ) {
				include $file;
			}
		}
	}

	Directorist_Announcement::instance();
}
