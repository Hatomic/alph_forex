# Generated by Django 4.1 on 2022-09-07 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_alter_account_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.CharField(max_length=70),
        ),
        migrations.AlterField(
            model_name='account',
            name='bonus_category',
            field=models.CharField(max_length=70),
        ),
    ]
