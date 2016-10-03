angular
    .module('app.translate', ['pascalprecht.translate'])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            'Menu.download.form': 'Download Form',
            'Menu.fill.form': 'Fill Form',
            'Basic.info.title': 'Basic Information',
            'Trailers.info.title': 'Trailers',
            'Btn.print.form': 'Print Form',
            'Label.name': 'Name',
            'Label.last.name': 'Last Name',
            'Label.email': 'Email',
            'Label.date': 'Date',
            'Label.city': 'City',
            'Label.theater': 'Theater',
            'Label.showtime': 'Showtime Hour',
            'Label.order': 'Order',
            'Label.duration': 'Duration',
            'Label.seconds': 'seconds',
            'Btn.add.trailer': 'Add trailer',
            'Label.no.records': 'No records added'
        });

        $translateProvider.translations('es', {
            'Menu.download.form': 'Descargar Formulario',
            'Menu.fill.form': 'Llenar Formulario',
            'Basic.info.title': 'Informacion Basica',
            'Trailers.info.title': 'Comerciales',
            'Btn.print.form': 'Imprimir Formulario',
            'Label.name': 'Nombre',
            'Label.last.name': 'Apellido',
            'Label.email': 'Email',
            'Label.date': 'Fecha',
            'Label.city': 'Ciudad',
            'Label.theater': 'Teatro',
            'Label.showtime': 'Hora de la Funcion',
            'Label.order': 'Orden',
            'Label.duration': 'Duracion',
            'Label.seconds': 'segundos',
            'Btn.add.trailer': 'Añadir Trailer',
            'Label.no.records': 'No se han agregado registros'
        });

        $translateProvider.translations('de', {
            'Menu.download.form': 'Formular herunterladen',
            'Menu.fill.form': 'Formular ausfüllen',
            'Basic.info.title': 'Grundlagen ',
            'Trailers.info.title': 'Anhänger',
            'Btn.print.form': 'Druckform',
            'Label.name': 'Vorname',
            'Label.last.name': 'Zuname',
            'Label.email': 'E-Mail',
            'Label.date': 'Datum',
            'Label.city': 'City',
            'Label.theater': 'Schauspielhaus',
            'Label.showtime': 'Performanz - Stunde',
            'Label.order': 'Verordnung',
            'Label.duration': 'Dauer',
            'Label.seconds': 'sekunden',
            'Btn.add.trailer': 'Beifügen Handels',
            'Label.no.records': 'Keine Datensätze hinzugefügt'
        });


        $translateProvider.translations('fr', {
            'Menu.download.form': 'Télécharger Form',
            'Menu.fill.form': 'Remplissez le formulaire',
            'Basic.info.title': 'Informations de base',
            'Trailers.info.title': 'Remorques',
            'Btn.print.form': 'Print Form',
            'Label.name': 'Nom',
            'Label.last.name': 'Le Nom',
            'Label.email': 'Email',
            'Label.date': 'Date',
            'Label.city': 'City',
            'Label.theater': 'Theater',
            'Label.showtime': 'Showtime Hour',
            'Label.order': 'Ordre',
            'Label.duration': 'Durée',
            'Label.seconds': 'secondes',
            'Btn.add.trailer': 'Ajouter commerciale',
            'Label.no.records': 'No records ajoutés'
        });

        $translateProvider.translations('it', {
            'Menu.download.form': 'Scarica il modulo',
            'Menu.fill.form': 'Compilare il modulo',
            'Basic.info.title': 'Informazioni di base',
            'Trailers.info.title': 'Trailers',
            'Btn.print.form': 'Modulo di stampa',
            'Label.name': 'Nome',
            'Label.last.name': 'Cognome',
            'Label.email': 'e-mail',
            'Label.date': 'Data',
            'Label.city': 'City',
            'Label.theater': 'Teatro',
            'Label.showtime': 'Showtime Hour',
            'Label.order': 'Ordine',
            'Label.duration': 'Durata',
            'Label.seconds': 'secondi',
            'Btn.add.trailer': 'Aggiungi commerciale',
            'Label.no.records': 'Non ci sono record aggiunti'
        });

        $translateProvider.preferredLanguage('en');
    }]);