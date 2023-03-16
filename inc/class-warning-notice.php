<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class DTKWarning {

	protected static $instance = null;

	private function __construct() {
		if ( ! is_admin() ) {
			return;
		}

		add_action( 'admin_notices', array( $this, 'admin_notice' ) );
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function admin_notice() {
		?>
		<div class="error">
			<p>
			<?php _e( 'Directorist - Announcement requires <a href="https://wordpress.org/plugins/directorist/" target="_blank">Directorist - Business Directory Plugin</a> to be activated.',
			'directorist-announcement' );?>
			</p>
		</div>
	<?php }
}

DTKWarning::instance();