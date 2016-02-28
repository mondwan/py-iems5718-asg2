"""
- `File`: query.py

- `Author`: Mond Wan

- `Email`: mondwan.1015@gmail.com

- `Github`: https://github.com/mondwan

- `Description`: /query handlers for asg2
"""


import webapp2
import json
from person import Person


class QueryHandler(webapp2.RequestHandler):
    """Handler for /query
    """
    def post(self):
        ret = {'exitStatus': True, 'ctx': ''}
        try:
            data = json.loads(self.request.body)

            if not data['email']:
                raise Exception('Missing email')

            p = Person.get_by_id(data['email'])

            if not p:
                raise Exception('No such person')

            ctx = p.to_dict()
            ret['exitStatus'] = True
            ret['ctx'] = ctx
        except Exception, e:
            ret['exitStatus'] = False
            ret['ctx'] = e.message

        self.response.write(json.dumps(ret))
