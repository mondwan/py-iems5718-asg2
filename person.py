"""
- `File`: person.py

- `Author`: Mond WAN

- `Email`: mondwan.1015@gmail.com

- `Github`: https://github.com/mondwna

- `Description`: Google appengine model
"""


from google.appengine.ext import ndb


class Person(ndb.Model):
    name = ndb.StringProperty()
    gender = ndb.StringProperty()
    age = ndb.IntegerProperty()
    exp = ndb.IntegerProperty()
    talent = ndb.StringProperty()
