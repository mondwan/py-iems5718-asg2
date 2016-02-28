{% autoescape on %}
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
        <title>Assignment 2 by [WAN HO LUN 1155002613]</title>
    </head>
    <body>
      <div class="container">
        <div class="row">
            {{formHeader}}
            {{formBody}}
            {{adminPanel}}
            <div class="col-xs-12">
                <hr>
                <strong>Designed by [WAN HO LUN & 1155002613]</strong>
            </div>
        </div>
      </div>

      {% include 'modal.tpl' %}

      <!-- your javascript code here, after DOMContentLoaded -->
      <script type="text/javascript" src="/js/jquery-2.2.0.min.js"></script>
      <script type="text/javascript" src="/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="/js/assignment2.js"></script>
    </body>
</html>
{% endautoescape %}
