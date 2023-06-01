from django.db import models


class Toy(models.Model):
    name = models.TextField()
    description = models.TextField()
    price = models.IntegerField()
    quantity = models.IntegerField()

    def __str__(self) -> str:
        return f"Toy - id: {self.id} - {self.name}"


class Order(models.Model):
    client_fullname = models.TextField()
    elements = models.ManyToManyField(Toy)

    def __str__(self) -> str:
        return f"Order - id: {self.id} - {self.client_fullname}"
