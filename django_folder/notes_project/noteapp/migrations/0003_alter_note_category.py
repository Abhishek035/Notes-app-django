# Generated by Django 4.2.7 on 2025-04-02 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('noteapp', '0002_alter_note_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='category',
            field=models.CharField(choices=[('BUSINESS', 'business'), ('IMPORTANT', 'important'), ('PERSONAL', 'personal')], default='PERSONAL', max_length=15),
        ),
    ]
