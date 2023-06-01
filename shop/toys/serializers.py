from typing import Any

from rest_framework import serializers

from toys.models import Toy, Order


class ToySerializer(serializers.ModelSerializer):
    class Meta:
        model = Toy
        fields = ["id", "name", "description", "price", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "client_fullname", "elements"]

    def create(self, validated_data: dict[str, Any]) -> Order:
        ordered_toys = validated_data.pop("elements")
        order = Order.objects.create(**validated_data)
        order.elements.add(*ordered_toys)
        return order
