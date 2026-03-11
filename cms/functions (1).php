<?php
/**
 * Twenty Twenty-Five functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */

// Adds theme support for post formats.
if ( ! function_exists( 'twentytwentyfive_post_format_setup' ) ) :
	/**
	 * Adds theme support for post formats.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_post_format_setup() {
		add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );
	}
endif;
add_action( 'after_setup_theme', 'twentytwentyfive_post_format_setup' );

// Enqueues editor-style.css in the editors.
if ( ! function_exists( 'twentytwentyfive_editor_style' ) ) :
	/**
	 * Enqueues editor-style.css in the editors.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_editor_style() {
		add_editor_style( 'assets/css/editor-style.css' );
	}
endif;
add_action( 'after_setup_theme', 'twentytwentyfive_editor_style' );

// Enqueues the theme stylesheet on the front.
if ( ! function_exists( 'twentytwentyfive_enqueue_styles' ) ) :
	/**
	 * Enqueues the theme stylesheet on the front.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_enqueue_styles() {
		$suffix = SCRIPT_DEBUG ? '' : '.min';
		$src    = 'style' . $suffix . '.css';

		wp_enqueue_style(
			'twentytwentyfive-style',
			get_parent_theme_file_uri( $src ),
			array(),
			wp_get_theme()->get( 'Version' )
		);
		wp_style_add_data(
			'twentytwentyfive-style',
			'path',
			get_parent_theme_file_path( $src )
		);
	}
endif;
add_action( 'wp_enqueue_scripts', 'twentytwentyfive_enqueue_styles' );

// Registers custom block styles.
if ( ! function_exists( 'twentytwentyfive_block_styles' ) ) :
	/**
	 * Registers custom block styles.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_block_styles() {
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'twentytwentyfive' ),
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfive_block_styles' );

// Registers pattern categories.
if ( ! function_exists( 'twentytwentyfive_pattern_categories' ) ) :
	/**
	 * Registers pattern categories.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_pattern_categories() {

		register_block_pattern_category(
			'twentytwentyfive_page',
			array(
				'label'       => __( 'Pages', 'twentytwentyfive' ),
				'description' => __( 'A collection of full page layouts.', 'twentytwentyfive' ),
			)
		);

		register_block_pattern_category(
			'twentytwentyfive_post-format',
			array(
				'label'       => __( 'Post formats', 'twentytwentyfive' ),
				'description' => __( 'A collection of post format patterns.', 'twentytwentyfive' ),
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfive_pattern_categories' );

// Registers block binding sources.
if ( ! function_exists( 'twentytwentyfive_register_block_bindings' ) ) :
	/**
	 * Registers the post format block binding source.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_register_block_bindings() {
		register_block_bindings_source(
			'twentytwentyfive/format',
			array(
				'label'              => _x( 'Post format name', 'Label for the block binding placeholder in the editor', 'twentytwentyfive' ),
				'get_value_callback' => 'twentytwentyfive_format_binding',
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfive_register_block_bindings' );

// Registers block binding callback function for the post format name.
if ( ! function_exists( 'twentytwentyfive_format_binding' ) ) :
	/**
	 * Callback function for the post format name block binding source.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return string|void Post format name, or nothing if the format is 'standard'.
	 */
	function twentytwentyfive_format_binding() {
		$post_format_slug = get_post_format();

		if ( $post_format_slug && 'standard' !== $post_format_slug ) {
			return get_post_format_string( $post_format_slug );
		}
	}
endif;

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        return $value;
    });
}, 15);


// Register Contact Submissions post type
add_action('init', function () {
    register_post_type('contact_submission', array(
        'labels' => array(
            'name' => 'Contact Messages',
            'singular_name' => 'Contact Messages'
        ),
        'public' => false,
        'show_ui' => true,
        'supports' => array('title'),
        'menu_icon' => 'dashicons-email',
    ));
});


add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/contact', array(
        'methods'  => 'POST',
        'callback' => 'handle_contact_form',
        'permission_callback' => '__return_true',
    ));
});

function handle_contact_form($request) {

    $params = $request->get_json_params();

    $name    = sanitize_text_field($params['name'] ?? '');
    $email   = sanitize_email($params['email'] ?? '');
    $subject = sanitize_text_field($params['subject'] ?? '');
    $message = sanitize_textarea_field($params['message'] ?? '');

    if (!$name || !$email || !$subject || !$message) {
        return new WP_REST_Response(['error' => 'Missing fields'], 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response(['error' => 'Invalid email'], 400);
    }

    // 1️⃣ Save to WordPress
    $post_id = wp_insert_post(array(
        'post_type'   => 'contact_submission',
        'post_status' => 'publish',
        'post_title'  => $name . ' - ' . $subject,
    ));

    if ($post_id) {
        update_post_meta($post_id, 'email', $email);
        update_post_meta($post_id, 'message', $message);
    }

    // 2️⃣ Send notification to admin
    wp_mail(
        'info@vandiams.com',
        "New Contact: $subject",
        "Name: $name\nEmail: $email\n\n$message",
        ['Reply-To: '.$email]
    );

    // 3️⃣ Send auto-reply to user
    $user_subject = "We received your message";
    $user_message = "
Hi $name,

Thank you for contacting us.

We have received your message regarding:

\"$subject\"

Our team will get back to you within 24-48 hours.

Best regards,
Vandiams Team
info@vandiams.com
";

    wp_mail(
        $email,
        $user_subject,
        $user_message,
        ['From: Vandiams <info@vandiams.com>']
    );

    return new WP_REST_Response(['success' => true], 200);
}


add_filter('manage_contact_submission_posts_columns', function($columns) {
    $columns['email'] = 'Email';
    $columns['message'] = 'Message';
    return $columns;
});

add_action('manage_contact_submission_posts_custom_column', function($column, $post_id) {
    if ($column === 'email') {
        echo esc_html(get_post_meta($post_id, 'email', true));
    }

    if ($column === 'message') {
        echo esc_html(wp_trim_words(get_post_meta($post_id, 'message', true), 10));
    }
}, 10, 2);

add_action('add_meta_boxes', function() {
    add_meta_box(
        'contact_details',
        'Contact Details',
        'render_contact_details',
        'contact_submission',
        'normal',
        'high'
    );
});

function render_contact_details($post) {
    $email = get_post_meta($post->ID, 'email', true);
    $message = get_post_meta($post->ID, 'message', true);

    echo '<p><strong>Email:</strong><br>' . esc_html($email) . '</p>';
    echo '<p><strong>Message:</strong><br>' . nl2br(esc_html($message)) . '</p>';
}


/* functions for Custom Designs starts */

function register_custom_design_cpt() {
    register_post_type('custom_design', [
        'labels' => [
            'name' => 'Design Requests',
            'singular_name' => 'Design Requests'
        ],
        'public' => false,
        'show_ui' => true,
        'supports' => ['title'],
        'menu_icon' => 'dashicons-admin-customizer'
    ]);
}

add_action('init', 'register_custom_design_cpt');

add_action('rest_api_init', function () {

  register_rest_route('custom/v1', '/design', [
    'methods' => 'POST',
    'callback' => 'save_custom_design',
    'permission_callback' => '__return_true'
  ]);

});

function save_custom_design($request) {

  $name = sanitize_text_field($_POST['name']);
  $email = sanitize_email($_POST['email']);
  $jewelryType = sanitize_text_field($_POST['jewelryType']);
  $occasion = sanitize_text_field($_POST['occasion']);
  $metal = sanitize_text_field($_POST['metal']);
  $budget = sanitize_text_field($_POST['budget']);
  $notes = sanitize_textarea_field($_POST['notes']);

  $post_id = wp_insert_post([
    'post_type' => 'custom_design',
    'post_title' => $name . ' - ' . $jewelryType,
    'post_status' => 'publish'
  ]);

  update_post_meta($post_id, 'email', $email);
  update_post_meta($post_id, 'occasion', $occasion);
  update_post_meta($post_id, 'metal', $metal);
  update_post_meta($post_id, 'budget', $budget);
  update_post_meta($post_id, 'notes', $notes);

  // Upload image if exists
  if (!empty($_FILES['image']['name'])) {

    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');
    require_once(ABSPATH . 'wp-admin/includes/image.php');

    $attachment_id = media_handle_upload('image', $post_id);

    if (!is_wp_error($attachment_id)) {
      set_post_thumbnail($post_id, $attachment_id);
    }
  }

  // Send admin email
  wp_mail(
    get_option('admin_email'),
    "New Custom Jewelry Request",
    "Name: $name\nEmail: $email\nJewelry: $jewelryType\nBudget: $budget\nNotes: $notes"
  );

  return [
    "success" => true,
    "post_id" => $post_id
  ];
}


/* Custom columns for Custom Designs */
add_filter('manage_custom_design_posts_columns', function($columns) {

    return [
        'cb' => $columns['cb'],
        'title' => 'Name',
        'email' => 'Email',
        'jewelry_type' => 'Jewelry Type',
        'occasion' => 'Occasion',
        'metal' => 'Metal',
        'budget' => 'Budget',
        'notes' => 'Notes',
        'inspiration' => 'Inspiration Image',
        'date' => 'Date'
    ];

});


add_action('manage_custom_design_posts_custom_column', function($column, $post_id) {

    switch ($column) {

        case 'email':
            echo esc_html(get_post_meta($post_id, 'email', true));
            break;

        case 'jewelry_type':
            echo esc_html(get_post_meta($post_id, 'jewelry_type', true));
            break;

        case 'occasion':
            echo esc_html(get_post_meta($post_id, 'occasion', true));
            break;

        case 'metal':
            echo esc_html(get_post_meta($post_id, 'metal', true));
            break;

        case 'budget':
            echo esc_html(get_post_meta($post_id, 'budget', true));
            break;

        case 'notes':
            echo esc_html(get_post_meta($post_id, 'notes', true));
            break;

        case 'inspiration':

            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, [60,60]);
            }

            break;

    }

}, 10, 2);

add_filter('manage_edit-custom_design_sortable_columns', function($columns) {

    $columns['email'] = 'email';
    $columns['budget'] = 'budget';

    return $columns;

});

add_action('add_meta_boxes', function () {

    add_meta_box(
        'custom_design_details',
        'Custom Design Submission',
        'render_custom_design_details',
        'custom_design',
        'normal',
        'high'
    );

});

function render_custom_design_meta($post){

    $fields = [
        'email' => 'Email',
        'jewelry_type' => 'Jewelry Type',
        'occasion' => 'Occasion',
        'metal' => 'Metal',
        'budget' => 'Budget',
        'notes' => 'Notes'
    ];

    echo '<table style="width:100%">';

    foreach($fields as $key => $label){

        $value = get_post_meta($post->ID, $key, true);

        echo "<tr>
                <td><strong>$label</strong></td>
                <td>$value</td>
              </tr>";
    }

    echo '</table>';

}

function render_custom_design_details($post) {

    $email = get_post_meta($post->ID, 'email', true);
    $jewelry_type = get_post_meta($post->ID, 'jewelry_type', true);
    $occasion = get_post_meta($post->ID, 'occasion', true);
    $metal = get_post_meta($post->ID, 'metal', true);
    $budget = get_post_meta($post->ID, 'budget', true);
    $notes = get_post_meta($post->ID, 'notes', true);

    $image_id = get_post_thumbnail_id($post->ID);
    $image_url = wp_get_attachment_url($image_id);

    echo '<table style="width:100%;border-collapse:collapse;">';

    echo "<tr>
            <td style='padding:8px;font-weight:bold;'>Email</td>
            <td>$email</td>
          </tr>";

    echo "<tr>
            <td style='padding:8px;font-weight:bold;'>Jewelry Type</td>
            <td>$jewelry_type</td>
          </tr>";

    echo "<tr>
            <td style='padding:8px;font-weight:bold;'>Occasion</td>
            <td>$occasion</td>
          </tr>";

    echo "<tr>
            <td style='padding:8px;font-weight:bold;'>Metal</td>
            <td>$metal</td>
          </tr>";

    echo "<tr>
            <td style='padding:8px;font-weight:bold;'>Budget</td>
            <td>$budget</td>
          </tr>";

    echo "<tr>
            <td style='padding:8px;font-weight:bold;'>Notes</td>
            <td>$notes</td>
          </tr>";

    echo '</table>';

    if ($image_url) {

        echo '<hr/>';

        echo '<h3>Inspiration Image</h3>';

        echo '<img src="' . esc_url($image_url) . '" style="max-width:400px;height:auto;border:1px solid #ddd;padding:5px;" />';

        echo '<p><a href="' . esc_url($image_url) . '" target="_blank">Open Full Image</a></p>';
    }

}
//custom design methods ends here

//Hiding menue
add_action('admin_menu', function () {

    remove_menu_page('edit.php'); // Posts
    remove_menu_page('edit.php?post_type=page'); // Pages
    remove_menu_page('edit-comments.php'); // Comments
    remove_menu_page('themes.php'); // Appearance
    remove_menu_page('plugins.php'); // Plugins
    remove_menu_page('tools.php'); // Tools

     remove_submenu_page(
        'edit.php?post_type=custom_design',
        'post-new.php?post_type=custom_design',
        'edit.php?post_type=contact_submission',
        'post-new.php?post_type=contact_submission'
    );

});

add_action('admin_head', function () {

    $screen = get_current_screen();

    if ($screen->post_type === 'custom_design' || $screen->post_type === 'contact_submission') {
        echo '<style>
            .page-title-action { display:none !important; }
        </style>';
    }

});

/* Checkout API Starts Here */

function register_order_cpt() {

  register_post_type('order', [
    'label' => 'Orders',
    'public' => false,
    'show_ui' => true,
    'supports' => ['title'],
    'menu_icon' => 'dashicons-cart'
  ]);

}

add_action('init', 'register_order_cpt');


/* Register Checkout API */
add_action('rest_api_init', function () {

  register_rest_route('store/v1', '/checkout', [
    'methods' => 'POST',
    'callback' => 'store_checkout',
    'permission_callback' => '__return_true'
  ]);

});


/* Checkout Handler */
function store_checkout($request) {

  $items = $request->get_param('items');

  $name = sanitize_text_field($request->get_param('name'));
  $email = sanitize_email($request->get_param('email'));
  $phone = sanitize_text_field($request->get_param('phone'));
  $address = sanitize_text_field($request->get_param('address'));

  $total = 0;
  $items_text = "";

  foreach ($items as $item) {

    $price = preg_replace('/[^0-9.]/', '', $item['price']);
    $qty = isset($item['quantity']) ? intval($item['quantity']) : 1;

    $subtotal = floatval($price) * $qty;
    $total += $subtotal;

    $items_text .= $item['name'] . " × " . $qty . " — $" . $subtotal . "\n";

  }

  $order_id = wp_insert_post([
    'post_type' => 'order',
    'post_title' => 'Order',
    'post_status' => 'publish'
  ]);

  wp_update_post([
    'ID'=>$order_id,
    'post_title'=>'Order #' . $order_id
  ]);

  update_post_meta($order_id,'order_items',$items_text);
  update_post_meta($order_id,'order_total',$total);
  update_post_meta($order_id,'order_status','New');

  update_post_meta($order_id,'customer_name',$name);
  update_post_meta($order_id,'customer_email',$email);
  update_post_meta($order_id,'customer_phone',$phone);
  update_post_meta($order_id,'customer_address',$address);

  return [
    "success"=>true,
    "order_id"=>$order_id
  ];

}

update_post_meta($order_id, 'items', $items);
update_post_meta($order_id, 'order_status', 'New');

add_action('add_meta_boxes', function () {

  add_meta_box(
    'order_details',
    'Order Details',
    'render_order_details',
    'order',
    'normal',
    'high'
  );

});

function render_order_details($post) {

  $name = get_post_meta($post->ID,'customer_name',true);
  $email = get_post_meta($post->ID,'customer_email',true);
  $phone = get_post_meta($post->ID,'customer_phone',true);
  $address = get_post_meta($post->ID,'customer_address',true);

  $items = get_post_meta($post->ID,'order_items',true);
  $total = get_post_meta($post->ID,'order_total',true);

  echo "<h3>Customer Information</h3>";

  echo "<p><strong>Name:</strong> ".esc_html($name)."</p>";
  echo "<p><strong>Email:</strong> ".esc_html($email)."</p>";
  echo "<p><strong>Phone:</strong> ".esc_html($phone)."</p>";
  echo "<p><strong>Address:</strong> ".esc_html($address)."</p>";

  echo "<hr>";

  echo "<h3>Order Items</h3>";

  echo "<pre style='background:#f6f7f7;padding:10px;border-radius:6px;'>".esc_html($items)."</pre>";

  echo "<p><strong>Total:</strong> $".esc_html($total)."</p>";

}

add_filter('manage_order_posts_columns', function($columns){

  $columns = [
    'cb' => $columns['cb'],
    'title' => 'Order',
    'customer_name' => 'Customer',
    'order_status' => 'Status',
    'order_total' => 'Total',
    'order_items' => 'Items',
    'date' => 'Date'
  ];

  return $columns;

});

add_action('manage_order_posts_custom_column', function($column, $post_id){

  if ($column === 'customer_name') {

    $name = get_post_meta($post_id,'customer_name',true);

    if(!$name) $name = "Guest";

    echo esc_html($name);

  }

  if ($column === 'order_total') {

    $total = get_post_meta($post_id,'order_total',true);

    echo '$' . esc_html($total);

  }

if ($column === 'order_items') {

  $items = get_post_meta($post_id,'order_items',true);
  $lines = array_filter(explode("\n", $items));

  $total_qty = 0;

  foreach($lines as $line){

    if(preg_match('/×\s*(\d+)/',$line,$matches)){
      $total_qty += intval($matches[1]);
    }

  }

  echo esc_html($total_qty) . " item(s)";

}
  if ($column === 'order_status') {

    $status = get_post_meta($post_id,'order_status',true);

    if(!$status) $status = "New";

    $status_class = '';

switch($status){

  case 'New':
    $status_class = 'order-new';
  break;

  case 'Processing':
    $status_class = 'order-processing';
  break;

  case 'Completed':
    $status_class = 'order-completed';
  break;

  case 'Cancelled':
    $status_class = 'order-cancelled';
  break;

}

echo '<span class="order-status '.$status_class.'">'.$status.'</span>';

  }

},10,2);

add_action('admin_head', function(){

echo '<style>

.order-status{
  padding:4px 10px;
  border-radius:20px;
  font-size:12px;
  font-weight:600;
  color:white;
}

.order-new{
  background:#2271b1;
}

.order-processing{
  background:#dba617;
}

.order-completed{
  background:#2ea44f;
}

.order-cancelled{
  background:#d63638;
}

</style>';

});
add_action('add_meta_boxes', function(){

  add_meta_box(
    'order_status_box',
    'Order Status',
    'render_order_status_box',
    'order',
    'side'
  );

});

function render_order_status_box($post){

  $status = get_post_meta($post->ID,'order_status',true);

  ?>

<select name="order_status" style="width:100%">
<option <?php selected($status,'New'); ?>>New</option>
<option <?php selected($status,'Processing'); ?>>Processing</option>
<option <?php selected($status,'Completed'); ?>>Completed</option>
<option <?php selected($status,'Cancelled'); ?>>Cancelled</option>
</select>

  <?php
}

add_action('save_post', function($post_id){

  if(isset($_POST['order_status'])){

    update_post_meta(
      $post_id,
      'order_status',
      sanitize_text_field($_POST['order_status'])
    );

  }

});