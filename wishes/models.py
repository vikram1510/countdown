from django.db import models

class Wish(models.Model):
    text = models.CharField(max_length=5000)
    name = models.CharField(default='Anonymous', max_length=30)

    def __str__(self):
        return f'{self.text} - {self.name}'
