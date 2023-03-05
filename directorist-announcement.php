<?php
/*
Plugin Name:    Directorist Announcement
Plugin URI:     https://directorist.com
Description:    Improve your search results by using custom taxonomy keywords.
Version:        1.0
Author:         wpWax
Author URI:     https://directorist.com/
*/

defined('ABSPATH') || die('No direct script access allowed!');

if ( ! defined('DIRECTORIST_ANNOUNCEMENT_VERSION ') ) {
	$plugin_data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
	define( 'DIRECTORIST_ANNOUNCEMENT_VERSION ', $plugin_data['version'] );
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
			//require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . 'inc/search-result.php';
			//require_once DIRECTORIST_ANNOUNCEMENT_BASE_DIR . 'inc/taxonomy-terms.php';
		}
	}

	Directorist_Announcement::instance();
}
