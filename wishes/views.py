from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from twilio.rest import Client
from django.conf import settings
from .models import Wish
from .serializers import WishSerializer

class TwilioSmsSender:
    '''
    Wrapper class to test/send sms using the Twilio SMS API
    '''

    def __init__(self, text, to_mobile):
        self._text = text
        self._to_mobile = to_mobile

    
    def send_sms(self):
        account_sid = settings.TWILIO_ACCOUNT_SID
        auth_token = settings.TWILIO_AUTH_TOKEN
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            body=self._text,
            to = self._to_mobile,
            from_ = settings.TWILIO_FROM
        )
        return message.sid
        

class SendSMS(APIView):

    def post(self, request):
        try:
            twilio = TwilioSmsSender(request.data.get('text'), request.data.get('mobile'))
            info = twilio.send_sms()
            return Response({'message': 'sms sent', 'info': info})
        except Exception as ex:
            return Response({'message': 'sms not sent', 'info': str(ex)}, status=402)


class SendAllSMS(APIView):

    def post(self, _request):
        wishes = Wish.objects.filter(is_sent=False)
        if not wishes:
            return Response({'message': 'No new wishes to be sent'})
        for wish in wishes:
            try:
                # TwilioSmsSender(wish.text, '07940795300').send_sms()
                text_body = f'from: {wish.name}\n\n{wish.text}'
                TwilioSmsSender(text_body, settings.MELS_NUMBER).send_sms()
                wish.is_sent = True
                wish.save()
            except Exception as ex:
                return Response({'message': 'sms not sent', 'info': str(ex)}, status=402)
        return Response({'message': 'All messages sent'})

class WishesIndex(ListCreateAPIView):
    queryset = Wish.objects.all().order_by('id')
    serializer_class = WishSerializer


class WishesDetail(RetrieveUpdateDestroyAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer

# Create your views here.
