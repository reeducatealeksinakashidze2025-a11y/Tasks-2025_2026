import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { Gender } from "src/common/enums/gender.enum";


export class UserQueryPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value: '+value.gender)
          if (!value.gender) return value;

    const mapping: Record<string, number> = { m: Gender.Male, f: Gender.Female, o: Gender.Other };
    const genderNumber = mapping[value.gender.toLowerCase()];

    if (!genderNumber) throw new BadRequestException('Invalid gender');

    return { ...value, gender: genderNumber };
    }
}