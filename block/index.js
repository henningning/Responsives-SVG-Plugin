(function (wp) {
    'use strict';

    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var useState = wp.element.useState;
    var registerBlockType = wp.blocks.registerBlockType;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var Button = wp.components.Button;
    var PanelBody = wp.components.PanelBody;
    var Placeholder = wp.components.Placeholder;
    var TextControl = wp.components.TextControl;
    var Notice = wp.components.Notice;

    registerBlockType('hr/responsive-svg', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var errorState = useState('');
            var error = errorState[0];
            var setError = errorState[1];
            var hasImage = !!(attributes.mediaId && attributes.mediaUrl);

            function onSelect(media) {
                var url = media && media.url ? media.url : '';
                var mime = media && media.mime ? media.mime : '';
                var isSvg = mime === 'image/svg+xml' ||
                    (media && media.subtype === 'svg+xml') ||
                    /\.svg(?:[?#].*)?$/i.test(url);

                if (!media || !media.id || !isSvg) {
                    setError('Bitte eine SVG-Datei aus der Mediathek auswählen.');
                    return;
                }

                setError('');
                setAttributes({
                    mediaId: Number(media.id),
                    mediaUrl: url,
                    alt: media.alt || media.alt_text || ''
                });
            }

            function removeImage() {
                setAttributes({mediaId: 0, mediaUrl: '', alt: ''});
                setError('');
            }

            function pickerButton(text, variant) {
                return el(MediaUploadCheck, null,
                    el(MediaUpload, {
                        onSelect: onSelect,
                        allowedTypes: ['image/svg+xml'],
                        value: attributes.mediaId || undefined,
                        render: function (mediaProps) {
                            return el(Button, {
                                variant: variant || 'primary',
                                onClick: mediaProps.open
                            }, text);
                        }
                    })
                );
            }

            var inspector = hasImage ? el(InspectorControls, null,
                el(PanelBody, {title: 'SVG-Einstellungen', initialOpen: true},
                    el(TextControl, {
                        label: 'Alternativtext',
                        help: 'Beschreibe das Logo für Screenreader. Bei rein dekorativen SVGs kann das Feld leer bleiben.',
                        value: attributes.alt || '',
                        onChange: function (value) {setAttributes({alt: value});}
                    }),
                    el('p', {className: 'components-base-control__help'},
                        'Das SVG füllt die verfügbare Blockbreite. Die Höhe passt sich proportional an. ' +
                        'Über die Block-Ausrichtung kann „Weite Breite“ oder „Volle Breite“ gewählt werden.'
                    ),
                    el(Button, {variant: 'tertiary', isDestructive: true, onClick: removeImage}, 'SVG entfernen')
                )
            ) : null;

            var content = hasImage ? el(Fragment, null,
                el('img', {
                    src: attributes.mediaUrl,
                    alt: attributes.alt || '',
                    className: 'hr-responsive-svg-preview'
                }),
                el('div', {className: 'hr-responsive-svg-actions'},
                    pickerButton('SVG austauschen', 'secondary'),
                    el(Button, {variant: 'tertiary', isDestructive: true, onClick: removeImage}, 'Entfernen')
                )
            ) : el(Placeholder, {
                icon: 'format-image',
                label: 'Responsives SVG',
                instructions: 'Wähle eine SVG-Datei aus deiner Mediathek. Sie wird immer proportional skaliert.'
            }, pickerButton('SVG auswählen', 'primary'));

            return el(Fragment, null,
                inspector,
                el('div', useBlockProps({className: 'hr-responsive-svg-editor'}),
                    error ? el(Notice, {
                        status: 'warning',
                        isDismissible: true,
                        onRemove: function () {setError('');}
                    }, error) : null,
                    content
                )
            );
        },

        // Dynamischer Block: WordPress lädt URL/Alt-Text auf dem Server anhand der Medien-ID.
        save: function () {return null;}
    });
})(window.wp);
