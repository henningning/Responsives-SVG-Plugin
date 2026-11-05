<?php
/**
 * Plugin Name: Responsives SVG – Gutenberg-Block
 * Description: Ein schlanker Block für SVG-Dateien aus der Mediathek mit automatisch responsiver Breite.
 * Version: 1.0.0
 * Requires at least: 6.1
 * Requires PHP: 7.4
 * Author: Henning Rolapp / ChatGPT
 * License: GPL-2.0-or-later
 * Text Domain: responsives-svg
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'init', function () {
    register_block_type( __DIR__ . '/block' );
} );
