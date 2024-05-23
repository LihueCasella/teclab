        // SDK de Mercado Pago
        import com.mercadopago.MercadoPagoConfig;
        // Agrega credenciales
        MercadoPagoConfig.setAccessToken("PROD_ACCESS_TOKEN");

        PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
        .id("item-ID-1234")
        .title("Meu produto")
        .currencyId("BRL")
        .pictureUrl("https://www.mercadopago.com/org-img/MP3/home/logomp3.gif")
        .description("Descrição do Item")
        .categoryId("art")
        .quantity(1)
        .unitPrice(new BigDecimal("75.76"))
        .build();

        List<PreferenceItemRequest> items = new ArrayList<>();
        items.add(itemRequest);

        Payer payer = new Payer();
        payer.setName("João");
        payer.setSurname("Silva");
        payer.setEmail("user@email.com");
        Phone phone = new Phone();
        phone.setAreaCode("11");
        phone.setNumber("4444-4444");
        payer.setPhone(phone);
        Identification identification = new Identification();
        identification.setType("CPF");
        identification.setNumber("19119119100");
        payer.setIdentification(identification);
        Address address = new Address();
        address.setStreetName("Street");
        address.setStreetNumber(123);
        address.setZipCode("06233200");
        payer.setAddress(address);

        BackUrls backUrls = new BackUrls();
        backUrls.setSuccess("https://www.success.com");
        backUrls.setFailure("http://www.failure.com");
        backUrls.setPending("http://www.pending.com");

        List<PreferencePaymentMethodRequest> excludedPaymentMethods = new ArrayList<>();

List<PreferencePaymentTypeRequest> excludedPaymentTypes = new ArrayList<>();


        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .payer(payer)
                .backUrls(backUrls)
                .autoReturn("approved")
                .paymentMethods(paymentMethods)
                .notificationUrl("https://www.your-site.com/ipn")
                .statementDescriptor("MEUNEGOCIO")
                .externalReference("Reference_1234")
                .expires(true)
                .expirationDateFrom("2016-02-01T12:00:00.000-04:00")
                .expirationDateTo("2016-02-28T12:00:00.000-04:00")
                .build();