<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\DTK;

class Taxonomy_Terms {

	protected static $instance = null;

	public function __construct() {
		/*show the select box form field to select an icon*/
		add_action( ATBDP_CATEGORY . '_add_form_fields', array( $this, 'add_keyword' ) );
		/*Updating A Term With Meta Data*/
		add_action( ATBDP_CATEGORY . '_edit_form_fields', array( $this, 'edit_keyword' ) );

		/*create the meta data*/
		add_action( 'created_' . ATBDP_CATEGORY, array( $this, 'save_keyword' ), 10, 2 );
		// update or save the meta data of the term
		add_action( 'edited_' . ATBDP_CATEGORY, array( $this, 'save_keyword' ), 10, 2 );
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public function add_keyword() { ?>

		<div class="form-field term-keyword-wrap">
			<label for="keyword"><?php echo esc_html__( 'Keywords', 'directorist-announcement' ); ?></label>
			<input type="text" id="keyword" name="keyword" value="">
			<p id="keyword">
				<?php echo __( 'Each comma <b>(",")</b> creates a single keyword. e.g. <b>drain cleaning, leak detection, water heater</b>', 'directorist-announcement' ); ?>
			</p>
		</div>

	<?php }

	public function edit_keyword( $term ) {
		$keyword = get_term_meta( $term->term_id, 'keyword', true );
		?>

		<tr class="form-field term-keyword-wrap">
			<th scope="row"><label for="keyword"><?php esc_html_e( 'Keyword', 'directorist-announcement' );?></label></th>
			<td>
				<input type="text" size="40" name="keyword" value="<?php echo esc_html( $keyword ); ?>" class="keyword" id="keyword"/>
				<p id="keyword">
					<?php echo __( 'Each comma <b>(",")</b> creates a single keyword. e.g. <b>drain cleaning, leak detection, water heater</b>', 'directorist-announcement' ); ?>
				</p>
			</td>
		</tr>

	<?php }

	public function save_keyword( $term_id ) {

		if ( isset( $_POST['keyword'] ) ) {
			$value = sanitize_text_field( $_POST['keyword'] );
			$value = strtolower( $value );
			if ( $value ) {
				update_term_meta( $term_id, 'keyword', $value );
			} else {
				delete_term_meta( $term_id, 'keyword' );
			}
		}
	}

}

Taxonomy_Terms::instance();
