<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\DTK;

use WP_Query;

class Search_Result
{

	protected static $instance = null;

	public function __construct()
	{
		add_filter('atbdp_listing_search_query_argument', array($this, 'search_query_argument'));
	}

	public static function instance()
	{
		if (null == self::$instance) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public static function getListingIdsBySearchQuery($searchQuery)
	{
		$queryArgs = array(
			'post_type'   => ATBDP_POST_TYPE,
			'post_status' => 'publish',
			's'           => $searchQuery,
			'fields'      => 'ids',
			'posts_per_page' => -1
		);

		$listings = new WP_Query($queryArgs);

		return empty($listings->posts) ? [] : $listings->posts;
	}
	
	public static function getListingIdsByTermsIds($term_ids)
	{
		$listings = get_posts(array(
			'post_type'      => ATBDP_POST_TYPE,
			'post_status'    => 'publish',
			'fields'         => 'ids',
			'no_found_rows'  => true,
			'cache_results'  => true,
			'numberposts'      => -1,
			'tax_query'      => array(
				array(
					'taxonomy' => ATBDP_CATEGORY,
					'field'    => 'term_id',
					'terms'    => $term_ids,
					'operator' => 'IN',
				),
			),
		));

		return empty($listings) ? [] : $listings;
	}

	public static function search_query_argument($args)
	{

		global $wpdb;

		$input_text = (isset($args['s'])) ? $args['s'] : '';
		if (empty($input_text)) {
			return $args;
		}

		$input_array = explode(' ', $input_text);

		$termmeta_table = $wpdb->prefix . 'termmeta';
		$select         = "SELECT term_id FROM $termmeta_table WHERE 1=1 AND";

		$where = '';
		foreach ($input_array as $index => $keyword) {
			$keyword  = strtolower($keyword);
			$relation = ($index === 0) ? '' : 'OR';
			$where .= " $relation ( meta_key = 'keyword' AND meta_value LIKE '%$keyword%' )";
		}

		$sql        = $select . $where;
		$sql_result = $wpdb->get_results($sql, ARRAY_A);
		$term_ids   = empty($sql_result) ? [] : array_map(function ($item) {
			return (int) $item['term_id'];
		}, $sql_result);

		$listingsIds     = Self::getListingIdsBySearchQuery($input_text);
		$termListingsIds = Self::getListingIdsByTermsIds($term_ids);
		$mergedIds       = array_merge($listingsIds, $termListingsIds);

		if (!empty($mergedIds)) {
			if (!empty($args['post__in']) && is_array($args['post__in'])) {
				$args['post__in'] = array_merge($args['post__in'], $mergedIds);
			} else {
				$args['post__in'] = $mergedIds;
			}
			unset($args['s']);
		}

		return $args;
	}
}

Search_Result::instance();
