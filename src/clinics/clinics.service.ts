import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clinic } from './schemas/clinic.schema';
import { ClinicDto } from './dto/clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(@InjectModel(Clinic.name) private clinicModel: Model<Clinic>) {}

  async create(createClinicDto: ClinicDto): Promise<Clinic> {
    const clinicWithDefaults = {
      ...createClinicDto,
      feesPercentage: createClinicDto.feesPercentage ?? 5,
    };
    const createdClinic = new this.clinicModel(clinicWithDefaults);
    return createdClinic.save();
  }

  async findAll(): Promise<Clinic[]> {
    return this.clinicModel.find().populate('employeeIds').exec();
  }

  async findByUser(userId: string): Promise<Clinic[]> {
    return this.clinicModel
      .find({
        $or: [{ adminIds: userId }, { employeeIds: userId }],
      })
      .populate('employeeIds')
      .exec();
  }

  async findOne(id: string): Promise<Clinic> {
    const clinic = await this.clinicModel
      .findById(id)
      .populate('employeeIds')
      .exec();
    if (!clinic) {
      throw new NotFoundException(`Clinic #${id} not found`);
    }
    return clinic;
  }

  async update(id: string, updateClinicDto: Partial<ClinicDto>): Promise<Clinic> {
    const existingClinic = await this.clinicModel
      .findByIdAndUpdate(id, updateClinicDto, { new: true })
      .exec();
    if (!existingClinic) {
      throw new NotFoundException(`Clinic #${id} not found`);
    }
    return existingClinic;
  }

  async remove(id: string): Promise<Clinic> {
    const deletedClinic = await this.clinicModel.findByIdAndDelete(id).exec();
    if (!deletedClinic) {
      throw new NotFoundException(`Clinic #${id} not found`);
    }
    return deletedClinic;
  }
}
