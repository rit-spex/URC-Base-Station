# Generated by Django 2.2.5 on 2019-11-10 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rover_base_station', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gps',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('time', models.TimeField(auto_now_add=True)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('altitude', models.FloatField()),
            ],
        ),
    ]
