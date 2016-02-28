"""
- `File`: root.py

- `Author`: Mond WAN

- `Email`: mondwan.1015@gmail.com

- `Github`: https://github.com/mondwan

- `Description`: Root handler for asg2
"""

import webapp2


class RootHandler(webapp2.RequestHandler):
    """Handler for /
    """
    def get(self):
        self.response.write('Hello!<br>')
        self.response.write('Start your <a href="/edit/form">form</a>')
