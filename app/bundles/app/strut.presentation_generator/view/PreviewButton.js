define(['libs/backbone', '../PreviewLauncher'],
function(Backbone, PreviewLauncher) {
	return Backbone.View.extend({
		className: 'btn-group iconBtns',
		events: {
			'click .act': '_launch'
		},

		initialize: function() {
			this._editorModel = this.options.editorModel;
			this._previewLauncher = new PreviewLauncher(this._editorModel);
			this._generators = this._editorModel.registry
				.getBest('strut.presentation_generator.GeneratorCollection');

			delete this.options.editorModel;
			// TODO: we should keep session meta per bundle...
			this._index = window.sessionMeta.generator_index || 0;

			this._template = JST['strut.presentation_generator/Button'];
		},

		_launch: function() {
			this._previewLauncher.launch(this._generators[this._index]);
		},

		_bind: function() {
			var self = this;
			this.$el.find('li').each(function(i) {
				var $btn = $(this);
				$btn.click(function(e) {
					// self._previewLauncher.launch(self._generators[i]);
					self.$el.find('.check').css('visibility', 'hidden');
					$btn.find('.check').css('visibility', '');
					self._index = i;
					window.sessionMeta.generator_index = i;
					e.stopPropagation();
				});
			});
		},

		render: function() {
			this.$el.html(this._template({generators: this._generators}));
			this._bind();
			$(this.$el.find('.check')[this._index]).css('visibility', '');
			return this;
		}
	});
});