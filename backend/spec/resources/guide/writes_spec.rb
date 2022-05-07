require 'rails_helper'

RSpec.describe GuideResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'guides',
          attributes: attributes_for(:guide)
        }
      }
    end

    let(:instance) do
      GuideResource.build(payload)
    end

    it 'works' do
      expect {
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      }.to change { Guide.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:guide) { create(:guide) }

    let(:payload) do
      {
        data: {
          id: guide.id.to_s,
          type: 'guides',
          attributes: { } # Todo!
        }
      }
    end

    let(:instance) do
      GuideResource.find(payload)
    end

    xit 'works (add some attributes and enable this spec)' do
      expect {
        expect(instance.update_attributes).to eq(true)
      }.to change { guide.reload.updated_at }
      # .and change { guide.foo }.to('bar') <- example
    end
  end

  describe 'destroying' do
    let!(:guide) { create(:guide) }

    let(:instance) do
      GuideResource.find(id: guide.id)
    end

    it 'works' do
      expect {
        expect(instance.destroy).to eq(true)
      }.to change { Guide.count }.by(-1)
    end
  end
end
