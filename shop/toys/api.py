from http import HTTPStatus

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from toys.models import Toy
from toys.serializers import ToySerializer, OrderSerializer


@api_view(["GET"])
def toys(request: Request) -> Response:
    all_toys = Toy.objects.all()
    serializer = ToySerializer(all_toys, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def orders(request: Request) -> Response:
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTPStatus.CREATED.value)
    return Response(serializer.data, status=HTTPStatus.BAD_REQUEST.value)
