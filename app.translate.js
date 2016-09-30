angular
    .module('app.translate', ['pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            'menu.download.form': 'Download Form',
            'menu.fill.form': 'Fill Form',
            'basic.info.title': 'Basic Information',
            'trailers.info.title': 'Trailers',
            'btn.print.form': 'Print Form',
            'label.name': 'Name',
            'label.last.name': 'Last Name',
            'label.email': 'Email',
            'label.date': 'Date',
            'label.city': 'City',
            'label.theater': 'Theater',
            'label.showtime': 'Showtime Hour',
            'label.order': 'Order',
            'label.duration': 'Duration',
            'label.seconds': 'Seconds'
        });

        $translateProvider.translations('es', {
            'menu.download.form': 'Descargar Formulario',
            'menu.fill.form': 'Llenar Formulario',
            'basic.info.title': 'Informacion Basica',
            'trailers.info.title': 'Comerciales',
            'btn.print.form': 'Imprimir Formulario',
            'label.name': 'Nombre',
            'label.last.name': 'Apellido',
            'label.email': 'Email',
            'label.date': 'Fecha',
            'label.city': 'Ciudad',
            'label.theater': 'Teatro',
            'label.showtime': 'Hora de la Funcion',
            'label.order': 'Orden',
            'label.duration': 'Duracion',
            'label.seconds': 'Segundos'
        });

        $translateProvider.translations('de', {
            'menu.download.form': 'Formular herunterladen',
            'menu.fill.form': 'Formular ausfüllen',
            'basic.info.title': 'Grundlagen ',
            'trailers.info.title': 'Anhänger',
            'btn.print.form': 'Print Form',
            'label.name': 'Name',
            'label.last.name': 'Nachname',
            'label.email': 'E-Mail',
            'label.date': 'Datum',
            'label.city': 'City',
            'label.theater': 'Theater',
            'label.showtime': 'Showtime -Stunde',
            'label.order': 'Order',
            'label.duration': 'Dauer',
            'label.seconds': 'Sekunden'
        });

        $translateProvider.preferredLanguage('en');
    }]);