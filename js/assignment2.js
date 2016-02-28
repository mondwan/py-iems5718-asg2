'use strict';

$(document).ready(function () {
  // console.log('testing');
  var $nameField = $('#name');
  var $gender = $('input[name=gender]');
  var $age = $('#age');
  var $exp = $('#exp');
  var $talent = $('#talent');
  var $viewTalent = $('#viewTalent');
  var $save = $('#save');
  var $modal= $('#modal');

  var getFormData = function () {
    return {
        name: $nameField.val(),
        gender: $('input:radio[name=gender]:checked').val(),
        age: parseInt($age.val(), 10),
        exp: parseInt($exp.val(), 10),
        talent: $talent.val(),
    };
  };

  var wrapShowModal = function (t, m) {
    $modal.find('.modal-title').text(t);
    $modal.find('.modal-body p').text(m);

    // Open modal box for success
    $modal.modal({
      keyboard: false,
      show: true,
      backdrop: 'static',
    });
  }

  var wrapAjax = function (url, data, onSuccess) {
    return $.ajax({
      method: 'POST',
      contentType: 'application/json; charset=UTF-8',
      url: url,
      dataType: 'json',
      data: JSON.stringify(data),
      success: onSuccess,
      error: function (e) {
          console.log('error', e);
      },
    });
  };

  var validateTalentTree = function (v) {
    var ret;
    // Throw error if talent is nil or starts with http or #
    if (
      v === '' ||
      v.slice(0, 1) === '#' ||
      v.slice(0, 4) === 'http'
    ) {
      ret = false;
    } else {
      ret = true;
    }

    return ret;
  };

  var validateForm = function () {
    // Validate field by field
    var ret = true;
    try {
      // Throw error to break if name field is empty
      if ($nameField.val() === '') {
        $nameField.parents('div.form-group').addClass('has-error');
        $nameField.siblings().last().text('Please enter your name');
        throw new Error();
      } else {
        $nameField.parents('div.form-group').removeClass('has-error');
        $nameField.siblings().last().text('');
      }

      // Throw error to break if age or exp are not in range
      $.each([$age, $exp], function (i, $el) {
        var v = $el.val();
        // Throw error if v is not [0, 99]
        if (v < 0 || v > 99) {
          $el.parents('div.form-group').addClass('has-error');
          $el.siblings().last().text('Value must be between 0, 99');
          throw new Error();
        } else {
          $el.parents('div.form-group').removeClass('has-error');
          $el.siblings().last().text('');
        }
      });

      // Throw error if talent is nil or starts with http or #
      var v = $talent.val();
      if (!validateTalentTree(v)) {
        $talent.parents('div.form-group').addClass('has-error');
        $talent.parent().siblings().last().text('Invalid talent tree URL');
        throw new Error();
      } else {
        $talent.parents('div.form-group').removeClass('has-error');
        $talent.parent().siblings().last().text('');
      }

    } catch (e) {
      ret = false;
    }

    return ret;
  };

  $gender.on('change', function (e) {
      $gender.prop('checked', false);
      var $target = $(e.target);
      $target.prop('checked', true);
  });

  $viewTalent.click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      // Throw error if talent is nil or starts with http or #
      var v = $talent.val();
      if (!validateTalentTree(v)) {
        $talent.parents('div.form-group').addClass('has-error');
        $talent.parent().siblings().last().text('Invalid talent tree URL');
        throw new Error();
      } else {
        $talent.parents('div.form-group').removeClass('has-error');
        $talent.parent().siblings().last().text('');
      }

      // Redirect user to that talent tree site
      window.location.href = 'http://www.dungeonsanddevelopers.com/#' + v;
    } catch (e) {
        console.log('e', e);
    }
  });

  // Admin part
  var $adminContainer = $('#admin');

  var onSuccess = function (response) {
    wrapShowModal(
        response.exitStatus ? 'Success' : 'Failure',
        response.ctx
    );
  };

  // Setup things only if $adminContainer exists
  if ($adminContainer) {
    var $search = $('#search', $adminContainer);
    var $email = $('#email', $adminContainer);

    $search.click(function () {
      if (validateForm()) {
        wrapAjax('/query', {email: $email.val()}, function (response) {
          if (!response.exitStatus) {
            wrapShowModal('Failure', response.ctx);
          } else {
            var ctx = response.ctx;
            $nameField.val(ctx.name);
            $gender.prop('checked', false);
            $('input:radio[name=gender][value=' + ctx.gender + ']').prop(
                'checked', true
            );
            $age.val(ctx.age);
            $exp.val(ctx.exp);
            $talent.val(ctx.talent);
          }
        });
      }
    });
    $save.click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (validateForm()) {
        var data = getFormData();
        var email = $email.val();
        if (email !== '') {
          data.email = email;
        }
        wrapAjax('/edit/form', data, onSuccess);
      }
    });
  } else {
    $save.click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (validateForm()) {
        wrapAjax('/edit/form', getFormData(), onSuccess);
      }
    });
  }
});
