"""
- `File`: edit_form.py

- `Author`: Mond WAN

- `Email`: mondwan.1015@gmail.com

- `Github`: https://github.com/mondwan

- `Description`: /edit/form handler for asg2
"""

import os
import logging
import json
import webapp2
from google.appengine.api import users as Users
from google.appengine.ext.webapp import template
from google.appengine.ext import ndb

import constants
from person import Person


class EditFormHandler(webapp2.RequestHandler):
    """Handler for /edit/form
    """
    def get(self):
        # Determine user has been login or not
        user = Users.get_current_user()

        if not user:
            # User has not yet login
            # Redirect users to the login page
            # Direct users back to our /edit/form after login successfully
            self.redirect(Users.create_login_url(self.request.uri))
        else:
            # User has been login
            email = user.email()
            logging.info(email)

            key = ndb.Key(Person, email)
            p = key.get() or Person(
                name='',
                gender='male',
                age=0,
                exp=0,
                talent=''
            )

            # Form header tpl
            formHeader = template.render(
                os.path.join(constants.TPL_DIR, 'formHeader.tpl'),
                {
                    'email': email,
                    # Redirect to '/' after logging out
                    'logoutUrl': Users.create_logout_url('/')
                }
            )

            # Form body tpl
            formBody = template.render(
                os.path.join(constants.TPL_DIR, 'formBody.tpl'),
                {
                    'name': p.name,
                    'age': p.age,
                    'exp': p.exp,
                    'talent': p.talent,
                    'male': p.gender == 'male',
                    'female': p.gender == 'female',
                }
            )

            # Admin panel
            isAdmin = Users.is_current_user_admin()
            adminPanel = ''
            if isAdmin:
                adminPanel = template.render(
                    os.path.join(constants.TPL_DIR, 'adminPanel.tpl'),
                    {}
                )

            # Asg2 tpl
            self.response.write(
                template.render(
                    os.path.join(constants.TPL_DIR, 'asg2.tpl'),
                    {
                        'formHeader': formHeader,
                        'formBody': formBody,
                        'adminPanel': adminPanel,
                    }
                )
            )

    def post(self):
        ret = {
            'exitStatus': True,
            'ctx': '',
        }

        try:
            user = Users.get_current_user()

            # Break if user does not login
            if not user:
                raise Exception('User does not login yet')

            # Parse input data
            data = json.loads(self.request.body)

            # Always remove email key from data
            email = user.email()
            _id = data.pop('email', email)

            # Check email field only if current user is not an admin
            if not Users.is_current_user_admin():
                if _id != email:
                    raise Exception('Require admin permission')

            # Set id field
            data['id'] = _id

            # Create a person record
            p = Person(**data)

            # Save record
            p.put()

            ret['exitStatus'] = True
            ret['ctx'] = 'Your data is saved successfully'
        except Exception, e:
            ret['exitStatus'] = False
            ret['ctx'] = e.message

        # Write json output back to the caller
        self.response.write(json.dumps(ret))
