<?php
/**
 * Serverseitige Ausgabe: das SVG wird sicher als <img> eingebunden,
 * nicht unkontrolliert als ausführbarer Inline-SVG-Code ausgegeben.
 *
 * @var array $attributes Block-Attribute.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$attachment_id = isset( $attributes['mediaId'] ) ? absint( $attributes['mediaId'] ) : 0;

if ( ! $attachment_id || 'image/svg+xml' !== get_post_mime_type( $attachment_id ) ) {
    return;
}

$src = wp_get_attachment_url( $attachment_id );
if ( ! $src ) {
    return;
}

$alt = isset( $attributes['alt'] ) ? $attributes['alt'] : '';

printf(
    '<figure %1$s><img src="%2$s" alt="%3$s" decoding="async"></figure>',
    get_block_wrapper_attributes(),
    esc_url( $src ),
    esc_attr( $alt )
);
