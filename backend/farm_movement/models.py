from django.db import models

class Farm(models.Model):
    premise_id = models.CharField(max_length=7,primary_key=True)
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    postal_code = models.DecimalField(max_digits=6, decimal_places=0)
    total_population = models.PositiveIntegerField()

class Movement(models.Model):
    movement_id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=30)
    origin_premise_id = models.ForeignKey(Farm, to_field='premise_id', on_delete=models.CASCADE, db_column = 'origin_premise_id', related_name='origin_premise_id')
    dest_premise_id = models.ForeignKey(Farm, to_field='premise_id', on_delete=models.CASCADE, db_column = 'dest_premise_id', related_name='dest_premise_id')
    species = models.CharField(max_length=15)
    shipment_start_date = models.DateField()
    items_moved = models.PositiveIntegerField()
    reason = models.CharField(max_length=50)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['company','origin_premise_id','dest_premise_id','species','shipment_start_date'], name='unique movement key')
        ]
