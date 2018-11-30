from django.db import models

# Create your models here.
class Brand(models.Model):
    brand_name = models.CharField(max_length=120,null=False)
    # def __str__(self):
    #     return "%s" % (str(self.brand_name))
    def __str__(self):
        return self.brand_name
class Model(models.Model):
    brand_name = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=120,null=False)
    def __str__(self):
        return "%s" % (str(self.model_name))
    # def __str__(self):
    #     return self.model_name
class Vehicle(models.Model):
    brand_name = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model_name = models.ForeignKey(Model, on_delete=models.CASCADE)
    register_no = models.CharField(max_length=120,null=False)
    value = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateField()
    def __str__(self):
        return "%s %s %s " % (str(self.register_no),str(self.value), str(self.date))
    # def __str__(self):
    #     return self.register_no,self.value,self.date
    @property
    def owner(self):
        return self.user








class Vehicletest(models.Model):
    register_no = models.CharField(max_length=120,null=False)
    value = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateTimeField()
    # def __str__(self):
    #     return "%s %s %s " % (str(self.register_no),str(self.value), str(self.date))
    def __str__(self):
        return self.register_no,self.value,self.date
