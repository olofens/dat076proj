from server import app
import unittest

class FlaskTestCase(unittest.TestCase):
    
    #Ensure that flask was set up correctly
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get("/", content_type="html/text")
        self.assertEqual(response.status_code, 200)
    
    def test_tasks(self):
        tester = app.test_client(self)
        response = tester.get("/tasks", content_type="applications/json")
        self.assertEqual(response.status_code, 200)

if (__name__ == '__main__'):
    unittest.main()